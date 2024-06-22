"use client"

import Link from "next/link"

interface BackButtonProps {
    backButtonLabel: string
    backButtonHref: string
}

export const BackButton = ({
    backButtonLabel,
    backButtonHref,
}: BackButtonProps) => {
    return (
        <button className="btn btn-ghost text-sm font-normal w-full">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
        </button>
    )
}
