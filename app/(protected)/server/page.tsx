import UserInfo from "@/components/user-info"
import { currentUser } from "@/lib/auth"

const ServerPage = async () => {
    const user = await currentUser()

    return <UserInfo label="🖥️ Server Component" user={user} />
    // return JSON.stringify({ user })
}

export default ServerPage
