"use client"

import Link from "next/link"
import HeaderLeftLinks from "./HeaderLeftLinks"
import SearchButton from "./SearchButton"
import SearchBar from "./SearchBar"
import { useContext, useEffect, useState } from "react"
import { CircleUser, UserRound } from 'lucide-react'
import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"

const Header = () => {
    const { userStore } = useContext(Context) as StoresType
    const [modalActive, setModalActive] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)

        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return (
        <header className="flex bg-white justify-between gap-8 h-[104px] py-5 px-20 sticky top-0 border-b border-solid border-[#C4CDEE] z-10">
            <div className="flex gap-8 h-full">
                <figure>
                    <Link href="/">
                        <img src="/img/logo.svg" className="w-full h-full object-cover" alt="logotype" />
                    </Link>
                </figure>
                <HeaderLeftLinks />
            </div>

            <div className="flex items-center gap-3 h-full">
                {!isClient
                    ?
                    <SearchButton onMouseEnter={() => { }} />
                    :
                    isMobile
                        ?
                        <SearchButton onClick={() => setModalActive(true)} />
                        :
                        <SearchButton onMouseEnter={() => setModalActive(true)} />
                }

                <SearchBar active={modalActive} setActive={setModalActive} />

                {!isClient
                    ?
                    <span>
                        <CircleUser className="text-[rgb(70,74,249)]" />
                    </span>
                    :
                    userStore.isAuth
                        ?
                        <Link className="flex justify-center items-center w-[60px] h-[60%] rounded-3xl bg-[rgb(70,74,249)]" href='/profile'>
                            <UserRound className="text-white" />
                        </Link>
                        :
                        <Link className="flex justify-center items-center w-[90px] h-[70%] rounded-3xl bg-[rgb(70,74,249)]" href="/login">
                            <p className="text-white">Войти</p>
                        </Link>
                }
            </div>
        </header>
    )
}

export default observer(Header)