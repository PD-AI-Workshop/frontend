'use client'

import { useTheme } from '@/hooks/useTheme'
import { observer } from 'mobx-react-lite'

const Footer = () => {
    const isDarkMode = useTheme()

    return (
        <footer
            className={`flex justify-between items-center gap-8 h-[104px] px-2 py-5 ${isDarkMode ? 'bg-black' : 'bg-white'} md:px-20`}
        >
            <div className="h-full">
                <figure className="h-full">
                    <a href="/">
                        <img
                            src={isDarkMode ? '/img/logoDark.png' : '/img/logo.svg'}
                            className="w-full h-full object-cover"
                            alt="logotype"
                        />
                    </a>
                </figure>
            </div>
            <p className="font-normal">2025</p>
        </footer>
    )
}

export default observer(Footer)
