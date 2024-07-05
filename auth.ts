import NextAuth from "next-auth"
import prisma from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
})
