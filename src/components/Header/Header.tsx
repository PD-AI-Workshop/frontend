"use client"

import Link from "next/link"
import HeaderLeftLinks from "./HeaderLeftLinks"
import SearchBar from "./SearchBar"
import { useContext, useEffect, useState } from "react"
import { CircleUser, Search, UserRound } from 'lucide-react'
import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"

const Header = () => {
    const { userStore, themeStore } = useContext(Context) as StoresType
    const [modalActive, setModalActive] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const isDarkMode = themeStore.isDarkMode

    useEffect(() => {
        setIsClient(true)
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        userStore.checkAuth()
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return (
        <header className={`flex justify-between h-[104px] py-5 px-2 sticky top-0 border-b border-solid border-[#C4CDEE] z-10 ${isDarkMode ? 'bg-black' : 'bg-white'} md:px-20 md:gap-8`}>
            <div className="flex gap-8 h-full">
                <figure>
                    <Link href="/">
                        <img src={isDarkMode ? '/img/logoDark.png' : '/img/logo.svg'} className="w-full h-full object-cover" alt="logotype" />
                    </Link>
                </figure>
                {!isMobile && <HeaderLeftLinks isDarkMode={isDarkMode} />}
            </div>

            <div className="flex items-center h-full md:gap-3">
                {!isClient
                    ?
                    <Search className={`mt-auto mb-auto ml-5 mr-5 ${isDarkMode ? 'bg-white' : 'text-[#040BB6]'} `} />
                    :
                    isMobile
                        ?
                        <Search className={`mt-auto mb-auto ml-5 mr-5 ${isDarkMode ? 'text-white' : 'text-[#040BB6]'} `} onClick={() => setModalActive(true)} />
                        :
                        <Search className={`mt-auto mb-auto ml-5 mr-5 ${isDarkMode ? 'text-white' : 'text-[#040BB6]'} `} onMouseEnter={() => setModalActive(true)} />
                }

                <SearchBar isDarkMode={isDarkMode} active={modalActive} setActive={setModalActive} />

                {!isClient
                    ?
                    <span>
                        <CircleUser className={`${isDarkMode ? 'text-white' : 'text-[rgb(70,74,249)]'}`} />
                    </span>
                    :
                    userStore.isAuth
                        ?
                        <Link className={`flex justify-center items-center w-[60px] h-[60%] rounded-3xl ${isDarkMode ? 'bg-white' : 'bg-[rgb(70,74,249)]'}`} href='/profile'>
                            <UserRound className={isDarkMode ? 'text-black' : 'text-white'} />
                        </Link>
                        :
                        <Link className={`flex justify-center items-center w-[90px] h-[70%] rounded-3xl ${isDarkMode ? 'bg-white' : 'bg-[rgb(70,74,249)]'}`} href="/login">
                            <p className={isDarkMode ? 'text-black' : 'text-white'}>Войти</p>
                        </Link>
                }
            </div>
        </header>
    )
}

export default observer(Header)