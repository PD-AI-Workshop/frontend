import { StoresType } from '@/types/StoresType'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useAuthCheck = (userStore: StoresType['userStore'], router: ReturnType<typeof useRouter>) => {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            await userStore.checkAuth()
            setIsCheckingAuth(false)
            if (!userStore.isAuth) router.push('/')
        }
        checkAuth()
    }, [userStore, router])

    return isCheckingAuth
}
