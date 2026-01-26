import { StoresType } from '@/types/StoresType'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useEffect, useState } from 'react'

export const useAuthCheck = (userStore: StoresType['userStore'], router: AppRouterInstance) => {
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
