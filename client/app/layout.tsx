'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { useEffect, useState } from "react";
import { useAuthStore, useThemeStore } from "@/src/store";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const { atStart } = useThemeStore()
    const { initAuth } = useAuthStore()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        initAuth()
    }, [initAuth])

    useEffect(() => {atStart()}, [atStart])

    return (
        <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                {mounted && children}
            </body>
        </html>
    );
}