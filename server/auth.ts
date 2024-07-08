"use server"

import * as z from "zod"
import { signIn } from "@/auth"
import { LoginSchema, RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import prisma from "@/prisma/client"
import { getUserByEmail } from "@/data/user"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, code } = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )
        return { success: "Confirmation Email Sent!" }
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) {
        return { error: "Invalid Credentials!" }
    }

    //TODO:: two-factor fix big where if user entered a wrong 2fa code
    //system is stopping to receive any more codes
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            )

            if (!twoFactorToken) {
                return { error: "Invalid code!" }
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!" }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if (hasExpired) {
                return { error: "Code expired!" }
            }

            await prisma.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            )

            if (existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                })
            }

            await prisma.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(
                existingUser.email
            )
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token
            )
            return { twoFactor: true }
        }
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(JSON.stringify(error))
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }

    return { success: "Success!" }
}

export const createUser = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { name, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "Email already exists!" }
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )
    return { success: "Success! Confirmation Email Sent" }
}
