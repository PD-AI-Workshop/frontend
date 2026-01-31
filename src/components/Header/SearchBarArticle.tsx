import { SearchBarArticlePropsType } from '@/types/SearchBarArticlePropsType'
import clsx from 'clsx'

const SearchBarArticle = ({ article, isDarkMode }: SearchBarArticlePropsType) => {
    return (
        <div
            className={clsx('m-2.5 flex border border-[rgba(166,166,166,0.463)] rounded-[15px] overflow-hidden h-20',
                {
                    'bg-[rgb(38,38,38)]': isDarkMode,
                    'bg-white': !isDarkMode
                }
            )}>
            <figure className="w-1/3 min-w-[100px] max-w-[150px]">
                <img className="w-full h-full object-cover" src={article.main_image_url} alt="article" />
            </figure>
            <div className="w-2/3 p-2 flex items-center">
                <p className="font-bold text-ellipsis overflow-hidden line-clamp-3">{article.title}</p>
            </div>
        </div>
    )
}

export default SearchBarArticle
