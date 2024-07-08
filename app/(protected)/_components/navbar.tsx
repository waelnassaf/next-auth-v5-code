"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import UserButton from "@/components/auth/user-button"

const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-white flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <button
                    className={`btn ${pathname === "/server" ? "btn-default" : "btn-outline"}`}
                >
                    <Link href="/server">Server</Link>
                </button>

                <button
                    className={`btn ${pathname === "/client" ? "btn-default" : "btn-outline"}`}
                >
                    <Link href="/client">Client</Link>
                </button>

                <button
                    className={`btn ${pathname === "/admin" ? "btn-default" : "btn-outline"}`}
                >
                    <Link href="/admin">Admin</Link>
                </button>

                <button
                    className={`btn ${pathname === "/settings" ? "btn-default" : "btn-outline"}`}
                >
                    <Link href="/settings">Settings</Link>
                </button>
            </div>
            <UserButton />
        </nav>
    )
}

export default Navbar
