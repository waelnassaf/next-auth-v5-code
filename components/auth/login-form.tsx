"use client"

import CardWrapper from "@/components/auth/card-wrapper"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        console.log(data)
    }

    return (
        <CardWrapper
            headerLabel="Welcome back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}
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
                        className={`input input-bordered w-full ${errors.email && "input-error"}`}
                        placeholder="Type Your Password"
                        {...register("password")}
                    />
                    {errors?.password?.message && (
                        <p className="text-red-700 mt-2 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </label>

                <FormError message="" />
                <FormSuccess message="" />
                <button className="btn btn-neutral w-full" type="submit">
                    Login
                </button>
            </form>
        </CardWrapper>
    )
}
