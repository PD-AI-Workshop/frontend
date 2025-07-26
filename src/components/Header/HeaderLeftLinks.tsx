import Link from "next/link"
import { BookOpenText, List } from "lucide-react"

export interface HeaderLeftLinksProps {
    isDarkMode: boolean
}

const HeaderLeftLinks = ({ isDarkMode }: HeaderLeftLinksProps) => {
    return (
        <div className="flex h-full items-center">
            <nav>
                <ul className="flex items-center gap-8 list-none">
                    <li>
                        <Link className="flex gap-2" href="/">
                            <BookOpenText className={isDarkMode ? 'text-white' : 'text-[#040BB6]'} />
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link className='flex gap-2' href="/feed">
                            <List className={isDarkMode ? 'text-white' : 'text-[#040BB6]'} />
                            Лента
                        </Link>
                    </li>
                    <li>
                        <Link className="flex gap-2" target="_blank" href='https://t.me/AI_officina'>
                            <figure className="w-6 h-6">
                                <img alt="icon" src="/img/telegram.svg" className="w-full h-full object-cover" />
                            </figure>
                            ТГ-канал
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderLeftLinks