'use client'

import { useEffect, useState } from "react"
import { ButtonSetState } from "../"

export const HomePage = () => {
    const title = 'Welcome to Perepihotic Watch'
    const [displayText, setDisplayText] = useState('')
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < title.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + title[index])
                setIndex(prev => prev + 1)
            }, 75)
            return () => clearTimeout(timer)
        }
    }, [index, title])

    return (
        <div className="homePage">
            <h1 className="typing">{displayText}<span className="cursor">|</span></h1>
            <p className="fadeIn">Watch your favorite content anytime, anywhere</p>
            <div className="homeActions fadeIn delay">
                <ButtonSetState page="login" title="Get Started" />
            </div>
        </div>
    )
}