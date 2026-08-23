'use client'

import { useEffect, useState } from "react"
import { ButtonSetState } from "../"
import { usePageStore } from "@/src/store"

export const HomePage = () => {
    const title = 'Welcome to Perepihotic Watch'
    const [displayText, setDisplayText] = useState('')
    const [index, setIndex] = useState(0)
    const {setPage} = usePageStore()

    useEffect(() => {
        if (index < title.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev=>prev+title[index])
                setIndex(prev=>prev+1)
            }, 70)
            return () => clearTimeout(timer)
        }}, [index, title])

    return (
    <div className="homePage">
        <h1 className="typing">{displayText}<span className="cursor">|</span></h1>
        <p className="fadeIn">Watch your favorite content anytime, anywhere</p>
        <p className="fadeIn delay-1">Join us today and unlock exclusive features</p>
        <div className="homeActions fadeIn delay-2">
        <ButtonSetState page="register" title="Get Started" />
        <p>Already have an account? <button onClick={() => setPage('login')} className="link">Sign In</button></p>
        </div>
    </div>
    )
}