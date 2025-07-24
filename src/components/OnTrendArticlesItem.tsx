import { OnTrendArticleItemProps } from "@/props/OnTrendArticleItemProps"
import Tag from "./Tag"
import { formatTime } from "@/utils/formatTime"

const OnTrendArticlesItem = ({ className, article, categories, files }: OnTrendArticleItemProps) => {
    return (
        <div className={`border border-gray-300/50 rounded-[12px] overflow-hidden ${className}`}>
            <img
                src={article.main_image_url}
                alt="article"
                className="object-cover rounded-tr-[12px] h-50 w-full"
            />

            <div className="p-3 flex flex-col">
                <p className="text-lg font-semibold line-clamp-3">
                    {article.title}
                </p>
                <div className="flex mt-1 justify-start gap-[5px]">
                    {categories.map(category => <Tag key={category.id} name={category.name} />)}
                </div>
            </div>

            <div className="px-4 py-2.5 flex justify-between border-t border-gray-200">
                <p className="text-sm font-normal text-gray-600 font-inter">{formatTime(article.created_date)}</p>
                <p className="text-sm font-normal text-gray-600 font-inter">Советы</p>
            </div>
        </div>
    )
}

export default OnTrendArticlesItem