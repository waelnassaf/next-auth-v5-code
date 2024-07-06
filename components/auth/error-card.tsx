import CardWrapper from "@/components/auth/card-wrapper"
import { FaTriangleExclamation } from "react-icons/fa6"

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex items-center justify-center">
                <FaTriangleExclamation className="text-4xl text-red-400" />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard
