'use client'

import { useContext, useEffect, useState } from "react";
import { Context } from "../StoresProvider";
import { StoresType } from "@/types/StoresType";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const Profile = () => {
    const { userStore, themeStore } = useContext(Context) as StoresType
    const user = userStore.getUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const role = user?.role
    const isDarkMode = themeStore.isDarkMode

    const handleAdminButton = () => router.push('/admin')

    const handleExitButton = async () => {
        await userStore.logout()
        router.push('/')
    }

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
        <main className={`min-h-[79vh] flex justify-center items-center ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <div className={`w-[28rem] rounded-2xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className='p-10'>
                    <h1 className={`text-center mb-10 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Аккаунт</h1>

                    <div className='space-y-6 mb-4'>
                        <div className="flex flex-col">
                            <span className="text-lg font-medium text-center py-2 px-4 bg-gray-100 rounded-lg text-black">
                                {user?.username}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className='text-lg font-medium cursor-pointer text-center py-2 px-4 bg-gray-100 rounded-lg text-black'>
                                {user?.email}
                            </span>
                        </div>
                    </div>

                    <ThemeToggleButton />

                    {(role === 'admin' || role === 'writer')
                        &&
                        <button
                            onClick={() => router.push('/editor')}
                            className="w-full mt-2 p-3 bg-indigo-600 text-white text-xl rounded-3xl cursor-pointer hover:bg-indigo-700"
                        >Написать статью</button>}

                    {role === 'admin'
                        &&
                        <button
                            onClick={handleAdminButton}
                            className="w-full mt-4 p-3 bg-neutral-600 text-white text-xl cursor-pointer rounded-3xl hover:bg-neutral-700"
                        >Админ-панель</button>}

                    <button onClick={handleExitButton} className="w-full mt-4 p-3 bg-red-600 text-white text-xl cursor-pointer rounded-3xl hover:bg-red-700">Выйти</button>
                </div>
            </div>
        </main>
    )
}

export default observer(Profile)