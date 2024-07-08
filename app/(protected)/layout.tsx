import Navbar from "./_components/navbar"
import React from "react"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div
            className="
        h-full w-full flex flex-col gap-y-10 items-center justify-center
        bg-gray-300"
        >
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout
