"use client"

// import

import { useCurrentUser } from "@/hooks/use-current-user"
import Image from "next/image"
import { LogoutButton } from "@/components/auth/logout-button"
import { AiOutlinePoweroff } from "react-icons/ai"
const UserButton = () => {
    const user = useCurrentUser()

    return (
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button">
                {user?.image ? (
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <Image
                                alt="Profile Picture"
                                src={user?.image}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                            <span>{user?.name?.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                )}
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <a>Item 2</a>
                </li>
                <li>
                    <LogoutButton>
                        <AiOutlinePoweroff className="text-2xl" /> Logout
                    </LogoutButton>
                </li>
            </ul>
        </div>
    )
}

export default UserButton
