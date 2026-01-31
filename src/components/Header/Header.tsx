'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'
import { CircleUser, Search, UserRound } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import NavigationLinks from '../NavigationLinks'
import { useTheme } from '@/hooks/useTheme'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useStores } from '@/hooks/useStores'
import { useIsClient } from '@/hooks/useIsClient'
import clsx from 'clsx'

const Header = () => {
    const { userStore } = useStores()
    const [modalActive, setModalActive] = useState(false)
    const isMobile = useMobileDetect()
    const isClient = useIsClient()
    const isDarkMode = useTheme()

    useEffect(() => {
        userStore.checkAuth()
    }, [])

    return (
        <header
            className={clsx('flex justify-between items-center h-[104px] py-5 px-2 sticky top-0 border-b border-solid border-[#C4CDEE] z-10 md:px-20 md:gap-8',
                {
                    'bg-black': isDarkMode,
                    'bg-white': !isDarkMode
                }
            )}>
            <div className="flex gap-8 h-full items-center">
                <Link href="/">
                    <img
                        src={isDarkMode ? '/img/logoDark.png' : '/img/logo.png'}
                        className="w-full h-[44.1px] object-contain"
                        alt="logotype"
                    />
                </Link>
                {!isMobile && <NavigationLinks isMobile={isMobile} isDarkMode={isDarkMode} />}
            </div>

            <div className="flex items-center h-full md:gap-3">
                {!isClient ? (
                    <Search className={clsx('mt-auto mb-auto ml-5 mr-5',
                        {
                            'bg-white': isDarkMode,
                            'text-[#040BB6]': !isDarkMode
                        }
                    )} />
                ) : isMobile ? (
                    <Search
                        className={clsx('mt-auto mb-auto ml-5 mr-5',
                            {
                                'text-white': isDarkMode,
                                'text-[#040BB6]': !isDarkMode
                            }
                        )}
                        onClick={() => setModalActive(true)}
                    />
                ) : (
                    <Search
                        className={clsx('mt-auto mb-auto ml-5 mr-5',
                            {
                                'text-white': isDarkMode,
                                'text-[#040BB6]': !isDarkMode
                            }
                        )}
                        onMouseEnter={() => setModalActive(true)}
                    />
                )}

                <SearchBar isDarkMode={isDarkMode} active={modalActive} setActive={setModalActive} />

                {!isClient ? (
                    <span>
                        <CircleUser className={clsx(
                            {
                                'text-white': isDarkMode,
                                'text-[rgb(70,74,249)]': !isDarkMode
                            }
                        )} />
                    </span>
                ) : userStore.isAuth ? (
                    <Link
                        className={clsx('flex justify-center items-center w-[60px] h-[60%] rounded-3xl',
                            {
                                'bg-white': isDarkMode,
                                'bg-[rgb(70,74,249)]': !isDarkMode
                            }
                        )}
                        href="/profile"
                    >
                        <UserRound className={clsx(
                            {
                                'text-black': isDarkMode,
                                'text-white': !isDarkMode
                            }
                        )} />
                    </Link>
                ) : (
                    <Link
                        className={clsx('flex justify-center items-center w-[90px] h-[70%] rounded-3xl',
                            {
                                'bg-white': isDarkMode,
                                'bg-[rgb(70,74,249)]': !isDarkMode
                            }
                        )}
                        href="/login"
                    >
                        <p className={clsx(
                            {
                                'text-black': isDarkMode,
                                'text-white': !isDarkMode
                            }
                        )}>Войти</p>
                    </Link>
                )}
            </div>
        </header>
    )
}

export default observer(Header)
