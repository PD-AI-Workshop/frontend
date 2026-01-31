import { NavigationLinksPropsType } from '@/types/NavigationLinksPropsType'
import clsx from 'clsx'
import { BookOpenText, List } from 'lucide-react'
import Link from 'next/link'

const NavigationLinks = ({ isDarkMode, isMobile }: NavigationLinksPropsType) => {
    return (
        <div
            className={clsx(
                {
                    'fixed bottom-0 h-10 left-0 right-0': isMobile,
                    'flex h-full items-center': !isMobile,
                },
                {
                    'bg-black': isMobile && isDarkMode,
                    'bg-[rgb(237,237,243)]': isMobile && !isDarkMode,
                }
            )}>
            <nav>
                <ul className={clsx('flex items-center gap-8 list-none',
                    {
                        'justify-center mt-2': isMobile
                    }
                )}>
                    <li>
                        <Link className="flex gap-2 items-center" href="/">
                            <BookOpenText className={clsx('w-6 h-6',
                                {
                                    'text-white': isDarkMode,
                                    'text-[#040BB6]': !isDarkMode
                                }
                            )} />
                            <p className="pb-[2px]">Главная</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="flex gap-2 items-center" href="/feed">
                            <List className={clsx(
                                {
                                    'text-white': isDarkMode,
                                    'text-[#040BB6]': !isDarkMode
                                }
                            )} />
                            <p className="pb-[2px]">Лента</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="flex gap-2 items-center" target="_blank" href="https://t.me/AI_officina">
                            <figure className="w-6 h-6">
                                <img alt="icon" src="/img/telegram.svg" className="w-full h-full object-contain" />
                            </figure>
                            <p className="pb-[2px]">ТГ-канал</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavigationLinks
