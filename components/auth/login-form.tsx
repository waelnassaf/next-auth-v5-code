"use client"

import CardWrapper from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "@/server/auth"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>("")
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with different provider!"
            : ""

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            loginUser(values)
                .then((data) => {
                    if (data?.error) {
                        reset()
                        setError(data?.error)
                    }

                    if (data?.success) {
                        reset()
                        setSuccess(data?.success)
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}
        >
            <form className="space-y-4 mb-5" onSubmit={handleSubmit(onSubmit)}>
                {showTwoFactor && (
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Two Factor Code</span>
                        </div>
                        <input
                            type="text"
                            className={`input input-bordered w-full ${errors.code && "input-error"}`}
                            placeholder="123456"
                            {...register("code")}
                            disabled={isPending}
                        />
                        {errors?.code?.message && (
                            <p className="text-red-700 mt-2 text-sm">
                                {errors.code.message}
                            </p>
                        )}
                    </label>
                )}
                {!showTwoFactor && (
                    <>
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
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                className={`input input-bordered w-full ${errors.password && "input-error"}`}
                                placeholder="Type Your Password"
                                {...register("password")}
                                disabled={isPending}
                            />
                            {errors?.password?.message && (
                                <p className="text-red-700 mt-2 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </label>
                    </>
                )}

                <Link
                    href="/auth/reset"
                    className="text-sm text-gray-500 hover:text-blue-500 hover:underline"
                >
                    Forgot your password?
                </Link>

                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <button
                    className={`btn btn-neutral w-full`}
                    disabled={isPending}
                    type="submit"
                >
                    {showTwoFactor ? "Confirm" : "Login"}
                </button>
            </form>
        </CardWrapper>
    )
}
