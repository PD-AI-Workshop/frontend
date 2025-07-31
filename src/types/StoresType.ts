import { ArticleStore } from '@/store/ArticleStore'
import { CategoryStore } from '@/store/CategoryStore'
import { FileStore } from '@/store/FileStore'
import { ThemeStore } from '@/store/ThemeStore'
import { UserStore } from '@/store/UserStore'

export type StoresType = {
    userStore: UserStore
    articleStore: ArticleStore
    categoryStore: CategoryStore
    fileStore: FileStore
    themeStore: ThemeStore
}
