'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import ArticleCard from '@/components/ArticleCard'
import { useStores } from '@/hooks/useStores'
import { useTheme } from '@/hooks/useTheme'

function Home() {
    const { articleStore, categoryStore, fileStore, themeStore } = useStores()

    useEffect(() => {
        articleStore.fetch()
        categoryStore.fetch()
        fileStore.fetch()
    }, [])

    const categories = categoryStore.getCategories()
    const onTrendArticles = articleStore.onTrendArticles
    const neuralNetworkArticles = articleStore.getNeuralNetworkArticles(categories)
    const lastArticles = articleStore.lastArticles
    const files = fileStore.getFiles()
    const isDarkMode = useTheme()

    return (
        <main className="flex flex-col items-center py-5 px-2.5 gap-5 grow shrink basis-0 w-full">
            <div className="w-full max-w-7xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-left w-full">В тренде</h2>
                <div className="flex flex-col justify-between mt-6 h-auto md:flex-row gap-4">
                    {onTrendArticles.map((article) => (
                        <Link href={`/article/${article.id}`} key={article.id}>
                            <ArticleCard
                                variant="trending"
                                className="rounded-xl h-[350px] md:w-[415px]"
                                article={article}
                                categories={categories}
                                isDarkMode={isDarkMode}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-7xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-left w-full">Нейросети</h2>
                <div className="flex flex-col md:flex-row gap-5 mt-6 h-auto">
                    {neuralNetworkArticles.map((article) => (
                        <Link
                            href={`/article/${article.id}`}
                            key={article.id}
                            className="w-full md:w-[48%] lg:w-[49%] xl:w-[631px]"
                        >
                            <ArticleCard
                                variant="trending"
                                className="rounded-xl w-full h-auto md:h-[350px]"
                                article={article}
                                categories={categories}
                                isDarkMode={isDarkMode}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full max-w-7xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-left w-full">Последнии статьи</h2>
                <div className="flex flex-col gap-5 mt-6">
                    {lastArticles.map((article) => (
                        <Link href={`/article/${article.id}`} key={article.id}>
                            <ArticleCard
                                variant="horizontal"
                                article={article}
                                categories={categories}
                                files={files}
                                isDarkMode={isDarkMode}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default observer(Home)
