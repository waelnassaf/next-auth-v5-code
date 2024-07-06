"use client"

import React from "react"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"
import { BackButton } from "@/components/auth/back-button"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <div className="card w-[400px] shadow-md bg-base-100">
            <div className="card-body">
                <h2 className="card-title">
                    <Header label={headerLabel} />
                </h2>
                {children}
                {showSocial && <Social />}
                <BackButton
                    backButtonHref={backButtonHref}
                    backButtonLabel={backButtonLabel}
                />
            </div>
        </div>
    )
}

export default CardWrapper
