"use client"

import { isMobile } from "react-device-detect"

export default function MobileHeader() {
    if(!isMobile) {
        return null
    }

    return (
        <div className="flex flex-col mb-8">
            <h1 className={'text-4xl font-bold font-jekoblack'}>
                <span className='text-[#FF4140] font-jekoblack'>Bienvenue</span> sur le blog Hiway
            </h1>
            <p className={'text-sm mt-4 text-[#979797]'}>Tout ce qu’il faut savoir pour vivre sa meilleure vie de freelance</p>
        </div>
    )
}