import { ExtendedUser } from "@/next-auth"
// import { Badge } from "@/components/ui/badge"

interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <div className="w-[600px] shadow-md card card-compact bg-white p-3">
            <h2 className="card-title">
                <p className="text-2xl font-semibold text-center">{label}</p>
            </h2>
            <div className="space-y-4 card-body">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Name</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Role</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>

                <div className="flex fl ex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <div
                        className={`badge ${user?.isTwoFactorEnabled ? "badge-primary" : "badge-secondary"}`}
                    >
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
