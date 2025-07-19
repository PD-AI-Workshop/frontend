import { ArticleType } from "@/types/ArticleType"
import { CategoryType } from "@/types/CategoryType"
import { FileType } from "@/types/FileType"

export interface OnTrendArticleItemProps {
    className: string
    article: ArticleType
    categories: CategoryType[]
    files: FileType[]
}