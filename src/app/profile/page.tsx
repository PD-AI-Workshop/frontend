'use client'

import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'
import ActionButton from '@/components/ActionButton'
import InfoItem from '@/components/InfoItem'

const Profile = () => {
    const { userStore } = useStores()
    const user = userStore.getUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const role = user?.role
    const isDarkMode = useTheme()

    const handleAdmin = useCallback(() => router.push('/admin'), [router])
    const handleEditor = useCallback(() => router.push('/editor'), [router])
    const handleLogout = useCallback(async () => {
        await userStore.logout()
        router.push('/')
    }, [userStore, router])
    const handleMonitoring = useCallback(() => window.location.href = "/monitoring", [])

    useEffect(() => {
        const func = async () => {
            await userStore.checkAuth()
            setIsLoading(false)

            if (!userStore.isAuth) {
                router.push('/')
            }
        }

        func()
    }, [userStore, router])

    if (isLoading) {
        return (
            <main className="min-h-[79vh] flex justify-center items-center bg-[rgb(237,237,243)]">
                <div className="text-xl">Загрузка...</div>
            </main>
        )
    }

    return (
        <main
            className={`min-h-[79vh] flex justify-center items-center p-8 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}
        >
            <div className={`w-[28rem] rounded-2xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className="p-10">
                    <h1
                        className={`text-center mb-10 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                    >
                        Аккаунт
                    </h1>

                    <div className="space-y-6 mb-4">
                        <InfoItem value={user?.username} />
                        <InfoItem value={user?.email} />
                    </div>

                    <ThemeToggleButton />

                    {(role === 'admin' || role === 'writer') && (
                        <ActionButton onClick={handleEditor} color="primary">
                            Написать статью
                        </ActionButton>
                    )}
                    {role === 'admin' &&
                        <div>
                            <ActionButton onClick={handleAdmin} color="secondary">
                                Админ-панель
                            </ActionButton>
                            <ActionButton onClick={handleMonitoring} color="purple">
                                Мониторинг
                            </ActionButton>
                        </div>}
                    <ActionButton onClick={handleLogout} color="danger">
                        Выйти
                    </ActionButton>
                </div>
            </div>
        </main>
    )
}

export default observer(Profile)
