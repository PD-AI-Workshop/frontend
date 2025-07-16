"use client"

import Link from "next/link"
import HeaderLeftLinks from "./HeaderLeftLinks"
import SearchButton from "./SearchButton"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import { CircleUser } from 'lucide-react'

const Header = () => {
    const [modalActive, setModalActive] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches
            setIsMobile(isMobile)
        }

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
                {isMobile
                    ?
                    <SearchButton onClick={() => setModalActive(true)} />
                    :
                    <SearchButton onMouseEnter={() => setModalActive(true)} />
                }
                <SearchBar active={modalActive} setActive={setModalActive} />
                <Link href='/login'>
                    <CircleUser className="text-[rgb(70,74,249)]" />
                </Link>
            </div>
        </header>
    )
}

export default Header