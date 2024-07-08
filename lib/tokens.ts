import crypto from "crypto"
import { v4 as uuid } from "uuid"
import prisma from "@/prisma/client"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"

export const generateVerificationToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
    //Underscores for readability.
    const token = crypto.randomInt(100_000, 1_000_000).toString()
    //Let it expire in a hour
    //TODO: change to 15 mins
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
    const existingToken = await getTwoFactorTokenByEmail(email)

    if (existingToken) {
        await prisma.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return twoFactorToken
}
