'use client'

import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

const Footer = () => {
    const isDarkMode = useTheme()

    return (
        <footer
            className={clsx('flex justify-between items-center gap-8 h-[104px] px-2 py-5 md:px-20',
                {
                    'bg-black': isDarkMode,
                    'bg-white': !isDarkMode
                }
            )}>
            <div className="h-full">
                <a href="/">
                    <img
                        src={isDarkMode ? '/img/logoDark.png' : '/img/logo.png'}
                        className="w-full h-[44.1px] object-contain"
                        alt="logotype"
                    />
                </a>
            </div>
            <p className="font-normal">2025</p>
        </footer>
    )
}

export default observer(Footer)
