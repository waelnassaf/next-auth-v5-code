"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewPasswordSchema } from "@/schemas"
import CardWrapper from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { useSearchParams } from "next/navigation"
import { newPassword } from "@/server/new-password"

const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    return (
        <CardWrapper
            headerLabel="Enter a new passwor"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <form className="space-y-4 mb-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input
                        type="password"
                        className={`input input-bordered w-full ${errors.password && "input-error"}`}
                        placeholder="******"
                        {...register("password")}
                        disabled={isPending}
                    />
                    {errors?.password?.message && (
                        <p className="text-red-700 mt-2 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </label>

                <FormError message={error} />
                <FormSuccess message={success} />
                <button
                    className={`btn btn-neutral w-full`}
                    disabled={isPending}
                    type="submit"
                >
                    Reset password
                </button>
            </form>
        </CardWrapper>
    )
}

export default NewPasswordForm
