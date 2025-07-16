import NavLink from "./NavLink"

const HeaderLeftLinks = () => {
    return (
        <div className="flex h-full items-center">
            <nav>
                <ul className="flex items-center gap-8 list-none">
                    <li><NavLink src="/img/guide.svg" href="/">Главная</NavLink></li>
                    <li><NavLink src="/img/feed.svg" href="/feed">Лента</NavLink></li>
                    <li><NavLink isTg={true} src="/img/telegram.svg" href="https://t.me/AI_officina">ТГ-канал</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderLeftLinks