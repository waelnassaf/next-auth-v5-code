"use client"

import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCurrentUser } from "@/hooks/use-current-user"
import { SettingsSchema } from "@/schemas"
import { UserRole } from "@prisma/client"

import { settings } from "@/server/settings"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { toast } from "sonner"

const SettingsPage = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const { update } = useSession()

    const user = useCurrentUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error)
                    }
                    if (data.success) {
                        toast.message("Success!")
                        update()
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <div className="w-[600px] card">
            <h2 className="card-title">
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </p>
            </h2>
            <div className="card-body card-bordered">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input
                                type="text"
                                className={`input input-bordered w-full ${errors.name && "input-error"}`}
                                placeholder="John Doe"
                                {...register("name")}
                                disabled={isPending}
                            />
                            {errors?.name?.message && (
                                <p className="text-red-700 mt-2 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </label>
                        {user?.isOAuth === false && (
                            <>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </div>
                                    <input
                                        type="email"
                                        className={`input input-bordered w-full ${errors.email && "input-error"}`}
                                        placeholder="your@email.com"
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
                                        <span className="label-text">
                                            Password
                                        </span>
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
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">
                                            New Password
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className={`input input-bordered w-full ${errors.newPassword && "input-error"}`}
                                        placeholder="******"
                                        {...register("newPassword")}
                                        disabled={isPending}
                                    />
                                    {errors?.newPassword?.message && (
                                        <p className="text-red-700 mt-2 text-sm">
                                            {errors.newPassword.message}
                                        </p>
                                    )}
                                </label>
                            </>
                        )}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Role</span>
                            </div>
                            <select
                                className={`select w-full max-w-xs ${errors.role && "input-error"}`}
                                {...register("role")}
                                disabled={isPending}
                            >
                                <option disabled>Select Role</option>
                                <option value={UserRole.USER}>User</option>
                                <option value={UserRole.ADMIN}>Admin</option>
                            </select>
                            {errors?.role?.message && (
                                <p className="text-red-700 mt-2 text-sm">
                                    {errors.role.message}
                                </p>
                            )}
                        </label>
                        {user?.isOAuth === false && (
                            <div className="form-control w-52">
                                <label className="label cursor-pointer">
                                    <span className="label-text">
                                        Two-Factor Authentication
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        {...register("isTwoFactorEnabled")}
                                        defaultChecked={
                                            user?.isTwoFactorEnabled
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <button
                        type="submit"
                        className="btn btn-neutral"
                        disabled={isPending}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SettingsPage
