"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export const Social = () => {
    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <button className="btn btn-outline w-full" onClick={() => {}}>
                <FcGoogle className="text-3xl mx-auto" />
            </button>
            <button className="btn btn-outline w-full" onClick={() => {}}>
                <FaGithub className="text-3xl mx-auto" />
            </button>
        </div>
    )
}
