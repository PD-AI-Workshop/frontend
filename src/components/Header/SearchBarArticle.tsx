import { SearchBarArticleProps } from "@/props/SearchBarArticleProps"

const SearchBarArticle = ({ article }: SearchBarArticleProps) => {
    return (
        <div className="m-2.5 grid grid-cols-[200px_200px] grid-rows-[200px] bg-white border border-[rgba(166,166,166,0.463)] rounded-[15px]">
            <figure>
                <img className="w-full h-full object-cover" src={article.mainImage} alt='article' />
            </figure>
            <div className="p-2.5 flex flex-col justify-around items-center text-ellipsis overflow-hidden">
                <p className="font-bold">{article.title}</p>
            </div>
        </div>
    )
}

export default SearchBarArticle