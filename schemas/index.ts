import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(1, {
        message: "Password is required!",
    }),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(6, {
        message: "Minimum password should be 6 characters!",
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
})
