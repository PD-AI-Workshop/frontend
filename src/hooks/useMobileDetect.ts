import { useEffect, useState } from 'react'

export const useMobileDetect = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)

        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    return isMobile
}
