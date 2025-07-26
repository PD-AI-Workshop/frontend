'use client'

import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"
import { useContext } from "react"

const Footer = () => {
    const { themeStore } = useContext(Context) as StoresType
    const isDarkMode = themeStore.isDarkMode

    return (
        <footer className={`flex justify-between items-center gap-8 h-[104px] py-5 px-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="h-full">
                <figure className="h-full">
                    <a href="/">
                        <img src={isDarkMode ? '/img/logoDark.png' : '/img/logo.svg'} className="w-full h-full object-cover" alt="logotype" />
                    </a>
                </figure>
            </div>
            <p className="font-normal">2025</p>
        </footer>
    )
}

export default observer(Footer)