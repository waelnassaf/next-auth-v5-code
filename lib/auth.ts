//Server Methods for server components and api routes
//For clients one visit /hooks

import { auth } from "@/auth"

export const currentUser = async () => {
    const session = await auth()

    return session?.user
}

export const currentRole = async () => {
    const session = await auth()

    return session?.user?.role
}
