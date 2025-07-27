'use client'

import { usePathname } from 'next/navigation'
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminPath = pathname?.startsWith('/admin')

    return (
        <>
            {!isAdminPath && <Header />}
            {children}
            {!isAdminPath && <Footer />}
        </>
    )
}