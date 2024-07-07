"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetSchema } from "@/schemas"
import CardWrapper from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { reset } from "@/server/reset"
import Link from "next/link"

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    })

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <form className="space-y-4 mb-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text"> Email</span>
                    </div>
                    <input
                        type="text"
                        className={`input input-bordered w-full ${errors.email && "input-error"}`}
                        placeholder="Type Your Email"
                        {...register("email")}
                        disabled={isPending}
                    />
                    {errors?.email?.message && (
                        <p className="text-red-700 mt-2 text-sm">
                            {errors.email.message}
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
                    Send reset email
                </button>
            </form>
        </CardWrapper>
    )
}

export default ResetForm
