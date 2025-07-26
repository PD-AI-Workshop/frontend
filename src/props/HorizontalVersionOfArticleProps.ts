import { ArticleType } from "@/types/ArticleType";
import { CategoryType } from "@/types/CategoryType";
import { FileType } from "@/types/FileType";

export interface HorizontalVersionOfArticleProps {
    article: ArticleType
    categories: CategoryType[]
    files: FileType[]
    isDarkMode: boolean
}