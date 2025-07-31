import { ArticleType } from '@/types/ArticleTypes'
import { CategoryType } from '@/types/CategoryTypes'
import { FileType } from '@/types/FileType'

export interface ArticleCardProps {
    variant: 'horizontal' | 'trending' | 'feed'
    article: ArticleType
    categories: CategoryType[]
    files?: FileType[]
    isDarkMode: boolean
    className?: string
}
