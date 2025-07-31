import type { Metadata } from 'next'
import './globals.css'
import StoresProvider from '../components/StoresProvider'
import ThemeInitializer from '@/components/ThemeInitializer'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
    title: 'AI-Workshop',
    icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <StoresProvider>
                    <ThemeInitializer />
                    <ConditionalLayout>{children}</ConditionalLayout>
                </StoresProvider>
            </body>
        </html>
    )
}
