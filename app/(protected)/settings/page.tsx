"use client"

import { signOut } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
    const user = useCurrentUser()
    return (
        <>
            <div>
                {JSON.stringify(user)}

                {user?.role}
            </div>
            <div>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        </>
    )
}

export default SettingsPage
