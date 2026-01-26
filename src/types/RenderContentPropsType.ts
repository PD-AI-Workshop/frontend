import { CategoryStore } from '@/store/CategoryStore'
import { FileStore } from '@/store/FileStore'
import { ArticleType } from '@/types/ArticleTypes'

export type RenderContentPropsType = {
    isLoading: boolean
    isDarkMode: boolean
    error: string | null
    searchTerm: string
    filteredArticles: ArticleType[]
    categoryStore: CategoryStore
    fileStore: FileStore
}
