"use server"
import * as z from "zod"
import { LoginSchema, RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt"
import prisma from "@/prisma/client"
import { getUserByEmail } from "@/data/user"

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
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
