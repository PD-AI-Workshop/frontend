import { Empty, Skeleton } from 'antd'
import Link from 'next/link'
import ArticleCard from './ArticleCard'
import { RenderContentPropsType } from '@/types/RenderContentPropsType'
import clsx from 'clsx'

export const RenderContent = ({
    isLoading,
    isDarkMode,
    error,
    searchTerm,
    filteredArticles,
    categoryStore,
    fileStore,
}: RenderContentPropsType) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} active avatar={{ shape: 'square' }} paragraph={{ rows: 3 }} />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className={clsx('rounded-xl p-12 text-center',
                {
                    'bg-black': isDarkMode,
                    'bg-white': !isDarkMode
                }
            )}>
                <h3 className="text-xl font-medium mb-2">Ошибка загрузки</h3>
                <p className="text-gray-600">{error}</p>
            </div>
        )
    }

    if (filteredArticles.length === 0) {
        return (
            <Empty
                description={
                    <span className={clsx(
                        {
                            'text-white': isDarkMode
                        }
                    )}>
                        {searchTerm ? 'По вашему запросу ничего не найдено' : 'Статьи не найдены'}
                    </span>
                }
                className={clsx('py-12 rounded-xl',
                    {
                        'bg-black text-white': isDarkMode,
                        'bg-white': !isDarkMode
                    }
                )}
            />
        )
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            {filteredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`} className="w-full">
                    <ArticleCard
                        variant="feed"
                        isDarkMode={isDarkMode}
                        article={article}
                        categories={categoryStore.getCategories()}
                        files={fileStore.getFiles()}
                    />
                </Link>
            ))}
        </div>
    )
}
