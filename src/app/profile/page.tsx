'use client'

import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import ThemeToggleButton from '@/components/ThemeToggleButton'
import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'
import ActionButton from '@/components/ActionButton'
import InfoItem from '@/components/InfoItem'
import Spinner from '@/components/Spinner'
import clsx from 'clsx'

const Profile = () => {
    const { userStore } = useStores()
    const user = userStore.getUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const role = user?.role
    const isDarkMode = useTheme()
    const isAdminOrWriter = role === 'admin' || role === 'writer'
    const isAdmin = role === 'admin'

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
        return <Spinner />
    }

    return (
        <main
            className={clsx('min-h-[79vh] flex justify-center items-center p-8',
                {
                    'bg-[rgb(38,38,38)]': isDarkMode,
                    'bg-[rgb(237,237,243)]': !isDarkMode
                }
            )}
        >
            <div className={clsx('w-[28rem] rounded-2xl overflow-hidden shadow-lg',
                {
                    'bg-black': isDarkMode,
                    'bg-white': !isDarkMode
                }
            )}>
                <div className="p-10">
                    <h1
                        className={clsx('text-center mb-10 text-3xl font-bold',
                            {
                                'text-white': isDarkMode,
                                'text-gray-800': !isDarkMode
                            }
                        )}>
                        Аккаунт
                    </h1>

                    <div className="space-y-6 mb-4">
                        <InfoItem value={user?.username} />
                        <InfoItem value={user?.email} />
                    </div>

                    <ThemeToggleButton />

                    {isAdminOrWriter && (
                        <ActionButton onClick={handleEditor} color="primary">
                            Написать статью
                        </ActionButton>
                    )}
                    {isAdmin &&
                        <>
                            <ActionButton onClick={handleAdmin} color="secondary">
                                Админ-панель
                            </ActionButton>
                            <ActionButton onClick={handleMonitoring} color="purple">
                                Мониторинг
                            </ActionButton>
                        </>}
                    <ActionButton onClick={handleLogout} color="danger">
                        Выйти
                    </ActionButton>
                </div>
            </div>
        </main>
    )
}

export default observer(Profile)
