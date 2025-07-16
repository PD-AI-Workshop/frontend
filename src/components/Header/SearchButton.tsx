import { ButtonHTMLAttributes } from 'react'

const SearchButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className="w-[50px] h-[50px] bg-white rounded-[25px] border-none">
            <img className="w-full h-full object-cover" src="/img/searchIcon.svg" alt="searchIcon" />
        </button>
    )
}

export default SearchButton