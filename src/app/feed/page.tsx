'use client'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../StoresProvider'
import { StoresType } from '@/types/StoresType'
import FeedVersionOfArticle from '@/components/FeedVersionOfArticle'
import Link from 'next/link'

const FeedPage = () => {
    const { articleStore, categoryStore, fileStore, themeStore } = useContext(Context) as StoresType
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOption, setSortOption] = useState<'relevance' | 'date' | 'reading_time'>('relevance')
    const [isLoading, setIsLoading] = useState(true);
    const isDarkMode = themeStore.isDarkMode

    console.log(isDarkMode)

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    categoryStore.fetch(),
                    articleStore.fetch(),
                    fileStore.fetch()
                ]);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const files = fileStore.getFiles()
    const articles = articleStore.getArticles()
    const categories = categoryStore.getCategories()
    const filteredArticles = articles
        .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOption === 'date') {
                return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
            } else if (sortOption === 'reading_time') {
                return a.time_reading - b.time_reading
            }
            return 0
        })

    return (
        <main className={`min-h-[79vh] py-8 px-4 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <div className='max-w-4xl mx-auto'>
                <div className={`rounded-xl p-6 mb-6 shadow-sm ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                    <div className='flex items-center justify-center mb-2'>
                        <h1 className='text-2xl font-bold'>Лента статей</h1>
                    </div>

                    <Input
                        size='large'
                        placeholder='Поиск по статьям... (нейросети, дизайн, GPT)'
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                        className='flex-grow'
                    />

                    <Select
                        size='large'
                        defaultValue="relevance"
                        style={{ width: 200, marginTop: '10px' }}
                        onChange={(value) => setSortOption(value as any)}
                        options={[
                            { value: 'relevance', label: 'По релевантности' },
                            { value: 'date', label: 'Новые сначала' },
                            { value: 'reading_time', label: 'Короткие сначала' },
                        ]}
                    />
                </div>

                <div className='flex flex-col items-center'>
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <p>Загрузка статей...</p>
                        </div>
                    ) : filteredArticles.length > 0
                        ?
                        <div className='flex flex-col items-center'>
                            {filteredArticles.map(article =>
                                <Link key={article.id} href={`/article/${article.id}`}>
                                    <FeedVersionOfArticle
                                        isDarkMode={isDarkMode}
                                        article={article}
                                        categories={categories}
                                        files={files}
                                    />
                                </Link>
                            )}
                        </div>
                        : (
                            <div className='bg-white rounded-xl p-12 text-center'>
                                <h3 className='text-xl font-medium mb-2'>Статьи не найдены</h3>
                                <p className='text-gray-600'>
                                    {searchTerm
                                        ? "По вашему запросу ничего не найдено"
                                        : "Попробуйте вернуться позже"}
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </main>
    )
}

export default FeedPage