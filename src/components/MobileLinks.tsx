import { BookOpenText, List } from "lucide-react"
import Link from "next/link"

export interface MobileLinksProps {
    isDarkMode: boolean
}

const MobileLinks = ({ isDarkMode }: MobileLinksProps) => {
    return (
        <ul className={`flex justify-center items-center fixed bottom-0 h-10 left-0 right-0 gap-8 list-none ${isDarkMode ? 'bg-black' : 'bg-[rgb(237,237,243)]'}`}> 
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
    )
}

export default MobileLinks