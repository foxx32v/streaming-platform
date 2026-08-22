'use client'

import { PageFeed } from "@/src/components";
import { useEffect } from "react"

const FinalFeed = () => {
    useEffect(() => {document.documentElement.setAttribute('data-theme', 'midnight');},[])
    return (
        <div>
            <PageFeed/>
        </div>
    )
}

export default FinalFeed