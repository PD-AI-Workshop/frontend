import { HorizontalVersionOfArticleProps } from '@/props/HorizontalVersionOfArticleProps'
import Tag from './Tag'
import { useEffect, useState } from 'react';
import { formatTime } from '@/utils/formatTime';

const HorizontalVersionOfArticle = ({ article, categories, files }: HorizontalVersionOfArticleProps) => {
    const contentFile = files.find(file => file.id === article.text_id)
    const [fileContent, setFileContent] = useState<string | null>(null)

    useEffect(() => {
        const fetchFileContent = async () => {
            if (contentFile === undefined) {
                return
            }

            const response = await fetch(contentFile.url)
            const text = await response.text()
            setFileContent(text)
        }

        fetchFileContent()
    }, [contentFile])
    
    return (
        <div className='flex w-7xl border border-gray-300/50 rounded-[12px] overflow-hidden'>
            <img
                src={article.main_image_url}
                alt="article"
                className="w-xl object-cover " />

            <div className="p-3 flex flex-col">
                <p className="text-3xl font-semibold line-clamp-3">{article.title}</p>

                <div className="my-4 min-h-[60px]">
                    {fileContent && <p className="text-gray-700 line-clamp-7">{fileContent}</p>}
                </div>

                <div className="flex justify-start gap-[5px]">
                    {categories.map(category => <Tag name={category.name} key={category.id} />)}
                </div>
                <div className='mt-6 flex justify-between'>
                    <p className="text-sm font-normal text-gray-600 font-inter">{formatTime(article.created_date)}</p>
                    <p className="text-sm font-normal text-gray-600 font-inter">Советы</p>
                </div>
            </div>
        </div>
    )
}

export default HorizontalVersionOfArticle