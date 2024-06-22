import { Poppins } from "next/font/google"
const font = Poppins({ subsets: ["latin"], weight: ["600"] })

interface HeaderProps {
    label: string
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="flex w-full flex-col gap-y-4 items-center justify-center">
            <h1 className={`${font.className} text-3xl font-semibold`}>
                🔐 Auth
            </h1>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    )
}
