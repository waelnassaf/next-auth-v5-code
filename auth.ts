import NextAuth from "next-auth"
import prisma from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id)

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false

            // if (existingUser.isTwoFactorEnabled) {
            //     const twoFactorConfirmation =
            //         await getTwoFactorConfirmationByUserId(existingUser.id)
            //
            //     if (!twoFactorConfirmation) return false
            //
            //     // Delete two factor confirmation for next sign in
            //     await db.twoFactorConfirmation.delete({
            //         where: { id: twoFactorConfirmation.id },
            //     })
            // }

            return true
        },
        async session({ session, token }) {
            console.log({ sessionTokeN: token })
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role

            return token
        },
    },
})
