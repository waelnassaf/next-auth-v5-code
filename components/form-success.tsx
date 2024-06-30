import { FaRegCheckCircle } from "react-icons/fa"

interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null

    return (
        <div className="flex items-center gap-x-2 text-sm bg-green-100 text-green-600 p-4 rounded-md">
            <FaRegCheckCircle />
            <p>{message}</p>
        </div>
    )
}
