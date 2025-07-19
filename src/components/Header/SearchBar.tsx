import { SearchBarProps } from "@/props/SearchBarProps";
import SearchButton from "./SearchButton";
import { useCallback, useState } from "react";

const SearchBar = ({ active, setActive }: SearchBarProps) => {
    const [value, setValue] = useState("");
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value), []);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();
    const stopPropagation = useCallback((e: React.MouseEvent): void => e.stopPropagation(), []);

    return (
        <div
            className={`fixed inset-0 flex flex-col items-end transition-all duration-300
                ${active
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"}`}
            onClick={() => setActive(false)}
        >
            <div
                className="absolute top-[7%] flex flex-col items-end w-full px-40"
                onClick={() => setActive(true)}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
            >
                <div
                    className="relative bg-white w-full max-w-[400px] h-[50px] pl-6 rounded-[25px] 
                        shadow-[17px_19px_24px_rgba(0,0,0,0.13)] z-10"
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
                        <SearchButton />
                    </form>
                </div>

                <div
                    className={`mt-2.5 flex flex-col w-full max-w-[400px] bg-white rounded-[15px] 
                        shadow-[17px_19px_24px_rgba(0,0,0,0.13)] overflow-y-auto max-h-[500px]
                        md:w-[440px] ${active ? "block" : "hidden"}`}
                    onMouseEnter={() => setActive(true)}
                >
                    {/* Результаты поиска будут здесь */}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;