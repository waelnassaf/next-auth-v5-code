"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

interface LoginButtonProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
}: LoginButtonProps) => {
    const router = useRouter()
    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
            <>
                <label
                    onClick={() => {
                        if (document) {
                            ;(
                                document.getElementById(
                                    "my_modal_1"
                                ) as HTMLFormElement
                            ).showModal()
                        }
                    }}
                >
                    {children}
                </label>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <LoginForm />
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
