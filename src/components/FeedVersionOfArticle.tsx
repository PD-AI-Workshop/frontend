import { ArticleType } from "@/types/ArticleType"
import { CategoryType } from "@/types/CategoryType"
import { FileType } from "@/types/FileType"
import { formatTime } from "@/utils/formatTime"
import { useEffect, useState } from "react"
import Tag from "./Tag"

export interface FeedVersionOfArticle {
    article: ArticleType
    categories: CategoryType[]
    files: FileType[]
}

const FeedVersionOfArticle = ({ article, categories, files }: FeedVersionOfArticle) => {
    const contentFile = files.find(file => file.id === article.text_id)
    const [fileContent, setFileContent] = useState<string | null>(null)

    useEffect(() => {
        const fetchFileContent = async () => {
            if (!contentFile) return

            try {
                const response = await fetch(contentFile.url);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const textContent = doc.body.textContent || "";
                const cleanText = textContent
                    .replace(/\s+/g, " ")
                    .trim();

                setFileContent(cleanText);
            } catch (error) {
                console.error("Error loading content:", error);
                setFileContent("Не удалось загрузить содержимое");
            }
        };

        fetchFileContent();
    }, [contentFile]);

    return (
        <div className='flex w-7xl mb-4 border bg-white border-gray-300/50 rounded-[12px] overflow-hidden'>
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

export default FeedVersionOfArticle