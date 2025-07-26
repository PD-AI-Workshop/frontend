import { ArticleType } from "@/types/ArticleType"
import { CategoryType } from "@/types/CategoryType"

export interface OnTrendArticleItemProps {
    className: string
    article: ArticleType
    categories: CategoryType[]
    isDarkMode: boolean
}