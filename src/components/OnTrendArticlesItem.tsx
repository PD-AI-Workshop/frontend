import { OnTrendArticleItemProps } from "@/props/OnTrendArticleItemProps"
import Tag from "./Tag"

const OnTrendArticlesItem = ({ className, article, categories }: OnTrendArticleItemProps) => {
    return (
        <div className={`border border-gray-300/50 rounded-[12px] overflow-hidden ${className}`}>
            <img
                src={article.mainImage}
                alt="article"
                className="object-cover rounded-tr-[12px]"
            />

            <div className="p-3 flex flex-col">
                <p className="text-lg font-semibold line-clamp-3">
                    {article.title}
                </p>
                <div className="flex justify-start gap-[5px]">
                    {categories.map(category => <Tag key={category.id} name={category.name} />)}
                </div>
            </div>

            <div className="px-4 py-2.5 flex items-center border-t border-gray-200">
                <div>
                    <p className="text-sm font-normal text-gray-600 font-inter">
                        Советы
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OnTrendArticlesItem