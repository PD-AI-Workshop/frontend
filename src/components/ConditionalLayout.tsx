'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useContext, useEffect, useState } from 'react'
import MobileLinks from './MobileLinks'
import { Context } from '@/app/StoresProvider'
import { StoresType } from '@/types/StoresType'
import { observer } from 'mobx-react-lite'

function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const { themeStore } = useContext(Context) as StoresType
    const pathname = usePathname()
    const isAdminPath = pathname?.startsWith('/admin')
    const [isMobile, setIsMobile] = useState(false)
    const isDarkMode = themeStore.isDarkMode

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return (
        <>
            {!isAdminPath && <Header />}
            {children}
            {!(isMobile <= isAdminPath) && <MobileLinks isDarkMode={isDarkMode} />}
            {!isAdminPath && <Footer />}
        </>
    )
}

export default observer(ConditionalLayout)