'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { observer } from 'mobx-react-lite'
import NavigationLinks from './NavigationLinks'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useTheme } from '@/hooks/useTheme'

function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminPath = pathname?.startsWith('/admin')
    const isMobile = useMobileDetect()
    const isDarkMode = useTheme()

    return (
        <>
            {!isAdminPath && <Header />}
            {children}
            {!(isMobile <= isAdminPath) && <NavigationLinks isMobile={isMobile} isDarkMode={isDarkMode} />}
            {!isAdminPath && <Footer />}
        </>
    )
}

export default observer(ConditionalLayout)
