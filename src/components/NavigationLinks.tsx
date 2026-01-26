import { NavigationLinksPropsType } from '@/types/NavigationLinksPropsType'
import { BookOpenText, List } from 'lucide-react'
import Link from 'next/link'

const NavigationLinks = ({ isDarkMode, isMobile }: NavigationLinksPropsType) => {
    return (
        <div
            className={
                isMobile
                    ? `fixed bottom-0 h-10 left-0 right-0 ${isDarkMode ? 'bg-black' : 'bg-[rgb(237,237,243)]'}`
                    : 'flex h-full items-center'
            }
        >
            <nav>
                <ul className={`flex items-center gap-8 list-none ${isMobile && 'justify-center mt-2'}`}>
                    <li>
                        <Link className="flex gap-2 items-center" href="/">
                            <BookOpenText className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-[#040BB6]'}`} />
                            <p className="pb-[2px]">Главная</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="flex gap-2 items-center" href="/feed">
                            <List className={isDarkMode ? 'text-white' : 'text-[#040BB6]'} />
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
