"use client"

import { admin } from "@/server/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {
    const onApiRouteClick = () => {
        fetch("/api/admin").then((res) => {
            if (res.ok) {
                toast.success("Allowed API Route!")
            } else {
                toast.error("Forbidden API Route!")
            }
        })
    }

    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.error) {
                toast.error(data.error)
            }

            if (data.success) {
                toast.success(data.success)
            }
        })
    }

    return (
        <div className="w-[600px] card">
            <h2 className="card-title">
                <p className="text-2xl font-semibold text-center">🔑 Admin</p>
            </h2>
            <div className="space-y-4 card-body">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only API route</p>
                    <button onClick={onApiRouteClick}>Click to test</button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <button onClick={onServerActionClick}>Click to test</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
