import { SearchBarProps } from "@/props/SearchBarProps";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Context } from "@/app/StoresProvider";
import { StoresType } from "@/types/StoresType";
import SearchBarArticle from "./SearchBarArticle";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { Search } from "lucide-react";

const SearchBar = ({ active, setActive, isDarkMode }: SearchBarProps) => {
    const [value, setValue] = useState("")
    const { articleStore } = useContext(Context) as StoresType

    useEffect(() => {
        articleStore.fetch()
    }, [articleStore])

    const articles = articleStore.getArticles()
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()
    const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])
    const filteredArticles = useMemo(() =>
        articles.filter(article =>
            article.title.toLowerCase().includes(value.toLowerCase())
        ), [articles, value]
    )

    return (
        <div
            className={`fixed inset-0 flex flex-col items-end transition-all duration-300
                ${active
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"}`}
            onClick={() => setActive(false)}
        >
            <div
                className="absolute top-5 right-5 flex flex-col md:top-10 md:right-10"
                onClick={() => setActive(true)}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                <div
                    className={`relative w-full max-w-[400px] h-[50px] pl-6 rounded-[25px] shadow-[17px_19px_24px_rgba(0,0,0,0.13)] z-10 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-white'}`}
                    onClick={stopPropagation}
                    onMouseEnter={() => setActive(true)}
                >
                    <form className="flex justify-between h-full" onSubmit={onSubmit}>
                        <input
                            className="h-full outline-none border-0 w-full bg-transparent"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Найти статью..."
                            value={value}
                        />
                        <Search className={`mt-auto mb-auto ml-5 mr-5 ${isDarkMode ? 'text-white' : 'text-[#040BB6]'} `} />
                    </form>
                </div>

                <div
                    className={`mt-2.5 flex flex-col w-full max-w-[400px] rounded-[15px] 
                        shadow-[17px_19px_24px_rgba(0,0,0,0.13)] overflow-y-auto overflow-x-hidden max-h-[500px]
                        md:w-[440px] ${active ? "block" : "hidden"} ${isDarkMode ? 'bg-black' : 'bg-white'}`}
                    onMouseEnter={() => setActive(true)}
                >
                    {filteredArticles.map((article) => (
                        <Link href={`/article/${article.id}`} key={article.id}>
                            <SearchBarArticle isDarkMode={isDarkMode} article={article} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(SearchBar)