"use client"

import CardWrapper from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "@/server/auth"
import { useState, useTransition } from "react"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        startTransition(() => {
            createUser(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel={"Already have an account?"}
            backButtonHref={"/auth/login"}
            showSocial={true}
        >
            <form className="space-y-4 mb-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Full Name</span>
                    </div>
                    <input
                        type="text"
                        className={`input input-bordered w-full ${errors.name && "input-error"}`}
                        placeholder="Type Your Name"
                        {...register("name")}
                        disabled={isPending}
                    />
                    {errors?.name?.message && (
                        <p className="text-red-700 mt-2 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </label>
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

                <FormError message={error} />
                <FormSuccess message={success} />
                <button
                    className={`btn btn-neutral w-full`}
                    disabled={isPending}
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </CardWrapper>
    )
}
