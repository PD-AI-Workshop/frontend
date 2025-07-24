import { SearchBarArticleProps } from "@/props/SearchBarArticleProps"

const SearchBarArticle = ({ article }: SearchBarArticleProps) => {
    return (
        <div className="m-2.5 flex bg-white border border-[rgba(166,166,166,0.463)] rounded-[15px] overflow-hidden">
            <figure className="w-1/3 min-w-[100px] max-w-[150px]">
                <img className="w-full h-full object-cover" src={article.main_image_url} alt='article' />
            </figure>
            <div className="w-2/3 p-2 flex items-center">
                <p className="font-bold text-ellipsis overflow-hidden line-clamp-3">{article.title}</p>
            </div>
        </div>
    )
}

export default SearchBarArticle