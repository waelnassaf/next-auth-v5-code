"use server"

import * as z from "zod"
import { signIn } from "@/auth"
import { LoginSchema, RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import prisma from "@/prisma/client"
import { getUserByEmail } from "@/data/user"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password } = validatedFields.data
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

    //TODO:: Send verification token email

    return { success: "Success! User created" }
}
