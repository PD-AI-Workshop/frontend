'use client'

import { Input, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useStores } from '@/hooks/useStores'
import { Search } from 'lucide-react'
import { RenderContent } from '@/components/RenderContent'

const FeedPage = () => {
    const { articleStore, categoryStore, fileStore } = useStores()
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOption, setSortOption] = useState<'relevance' | 'date' | 'reading_time'>('relevance')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const isDarkMode = useTheme()

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([categoryStore.fetch(), articleStore.fetch(), fileStore.fetch()])
            } catch (error) {
                setError('Ошибка загрузки данных. Попробуйте обновить страницу.')
                console.error('Ошибка загрузки данных:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [articleStore, categoryStore, fileStore])

    const filteredArticles = useMemo(() => {
        if (!articleStore.getArticles()) return []

        return [...articleStore.getArticles()]
            .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortOption === 'date') {
                    return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
                } else if (sortOption === 'reading_time') {
                    return a.time_reading - b.time_reading
                }
                return 0
            })
    }, [articleStore.getArticles(), searchTerm, sortOption])

    return (
        <main className={`min-h-[79vh] py-8 px-4 ${isDarkMode ? 'bg-[rgb(38,38,38)]' : 'bg-[rgb(237,237,243)]'}`}>
            <div className="max-w-6xl mx-auto">
                <div className={`rounded-xl p-6 mb-6 shadow-sm ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                    <h1 className="text-2xl font-bold text-center mb-4">Лента статей</h1>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            size="large"
                            placeholder="Поиск по статьям..."
                            prefix={<Search />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                            className="flex-grow"
                        />

                        <Select
                            size="large"
                            value={sortOption}
                            onChange={setSortOption}
                            options={[
                                { value: 'relevance', label: 'По релевантности' },
                                { value: 'date', label: 'Новые сначала' },
                                { value: 'reading_time', label: 'Короткие сначала' },
                            ]}
                            className="w-full sm:w-48"
                        />
                    </div>
                </div>

                {RenderContent({
                    isLoading,
                    isDarkMode,
                    error,
                    searchTerm,
                    filteredArticles,
                    categoryStore,
                    fileStore,
                })}
            </div>
        </main>
    )
}

export default FeedPage
