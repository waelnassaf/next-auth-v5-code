"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }
    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <button
                className="btn btn-outline w-full"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="text-3xl mx-auto" />
            </button>
            <button
                className="btn btn-outline w-full"
                onClick={() => onClick("github")}
            >
                <FaGithub className="text-3xl mx-auto" />
            </button>
        </div>
    )
}
