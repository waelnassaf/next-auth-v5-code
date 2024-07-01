import { Poppins } from "next/font/google"
import { LoginButton } from "@/components/auth/login-button"
const font = Poppins({ subsets: ["latin"], weight: ["600"] })

export default function Home() {
    return (
        <main
            className={`${font.className}
        flex h-full flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500`}
        >
            <div className="space-y-6 text-white text-center">
                <h1 className="text-6xl semi-bold drop-shadow-md">🔐 Auth</h1>
                <p className="text-lg">A simple auth service.</p>
                <div>
                    <LoginButton>
                        <button className="btn btn-neutral">Sign In</button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}
