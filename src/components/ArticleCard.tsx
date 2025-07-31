import { formatTime } from '@/utils/formatTime'
import { useEffect, useState } from 'react'
import Tag from './Tag'
import { ArticleCardProps } from '@/props/ArticleCardProps'

const ArticleCard = ({ variant, article, categories, files = [], isDarkMode, className = '' }: ArticleCardProps) => {
    const needsContent = variant === 'horizontal' || variant === 'feed'
    const contentFile = needsContent ? files.find((f) => f.id === article.text_id) : null
    const [fileContent, setFileContent] = useState<string | null>(null)

    useEffect(() => {
        const fetchContent = async () => {
            if (!needsContent || !contentFile) return

            try {
                const res = await fetch(contentFile.url)
                const html = await res.text()
                const doc = new DOMParser().parseFromString(html, 'text/html')
                const text = doc.body.textContent || ''

                setFileContent(text.replace(/\s+/g, ' ').trim())
            } catch (error) {
                console.error('Error loading content:', error)
                setFileContent('Не удалось загрузить содержимое')
            }
        }

        fetchContent()
    }, [needsContent, contentFile])

    const formattedDate = formatTime(article.created_date)
    const filteredCategories = categories.filter((c) => article.category_ids.includes(c.id))

    const ImageBlock = (
        <img
            src={article.main_image_url}
            alt="article"
            className={`
        ${variant === 'horizontal' ? 'w-full md:w-[500px]' : variant === 'trending' ? 'w-full h-50' : 'w-full md:w-64 lg:w-80'}
        ${variant === 'trending' ? 'rounded-tr-[12px]' : 'rounded-t-[12px] md:rounded-tr-none md:rounded-l-[12px]'} object-cover`}
        />
    )

    const Footer = (
        <div
            className={`flex justify-between items-center
      ${variant === 'trending' ? 'px-4 py-2.5 border-t border-gray-200' : 'mt-13'}
      ${isDarkMode ? 'text-white' : 'text-gray-600'}`}
        >
            <p className="text-sm font-inter">{formattedDate}</p>
            <p className="text-sm font-inter">Советы</p>
        </div>
    )

    return (
        <div
            className={`border border-gray-300/50 rounded-[12px] overflow-hidden
        ${isDarkMode ? 'bg-black' : 'bg-white'}
        ${variant === 'horizontal' ? 'flex flex-col md:flex-row' : variant === 'feed' ? 'mb-4 md:flex' : 'flex flex-col'}
        ${className}`}
        >
            {ImageBlock}
            <div className="flex flex-col flex-1 p-3">
                <p className={`font-semibold line-clamp-3 ${variant === 'trending' ? 'text-lg' : 'text-3xl'}`}>
                    {article.title}
                </p>

                {needsContent && fileContent && (
                    <div className="my-4 min-h-[60px]">
                        <p className={`line-clamp-3 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{fileContent}</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-1">
                    {filteredCategories.map((category) => (
                        <Tag key={category.id} name={category.name} />
                    ))}
                </div>
                {variant !== 'trending' && Footer}
            </div>

            {variant === 'trending' && Footer}
        </div>
    )
}

export default ArticleCard
