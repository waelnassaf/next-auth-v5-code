import { FaTriangleExclamation } from "react-icons/fa6"

interface FormErrorProps {
    message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null

    return (
        <div className="flex items-center gap-x-2 text-sm bg-red-100 text-red-500 p-4 rounded-md">
            <FaTriangleExclamation />
            <p>{message}</p>
        </div>
    )
}
