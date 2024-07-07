import prisma from "@/prisma/client"

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await prisma.verificationToken.findFirst({
            where: { email },
        })
    } catch (error) {
        return null
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await prisma.verificationToken.findUnique({
            where: { token },
        })
    } catch (error) {
        return null
    }
}
