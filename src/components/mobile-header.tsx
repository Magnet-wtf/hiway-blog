"use client"

import { isMobile } from "react-device-detect"

export default function MobileHeader() {
    if(!isMobile) {
        return null
    }

    return (
        <div>
            <h1>Mobile Header</h1>
        </div>
    )
}