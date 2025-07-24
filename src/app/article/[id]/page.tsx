'use client'

import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { formatDate } from "@/utils/formatTime"
import { UserRound } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

const ArticlePage = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [content, setContent] = useState<string>()
    const { articleStore, fileStore, userStore } = useContext(Context) as StoresType
    const article = articleStore.currentArticle
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const router = useRouter()

    useEffect(() => {
        let isMounted = true

        const fetchArticle = async () => {
            if (!id || isNaN(parseInt(id))) {
                return
            }

            try {
                setIsLoading(true)
                setContent(undefined)
                setError(null)

                articleStore.setCurrentArticle(null)

                const articleId = parseInt(id)
                await articleStore.getById(articleId)
                const fetchedArticle = articleStore.currentArticle

                if (!fetchedArticle) throw new Error("Статья не найдена")

                const file = await fileStore.getById(fetchedArticle.text_id)
                const response = await fetch(file.url)
                const html = await response.text()
                const user = await userStore.getCurrentUser()

                if (user && isMounted) {
                    userStore.setUser(user)
                }

                if (isMounted) setContent(html)
            } catch (error) {
                if (isMounted) setError("Ошибка загрузки")
                console.error("Error fetching article:", error)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchArticle()

        return () => { isMounted = false }
    }, [id, articleStore, fileStore])

    const handleDelete = async () => {
        if (!article) return

        const isConfirmed = window.confirm("Вы уверены, что хотите удалить статью?")

        if (isConfirmed) {
            try {
                await articleStore.delete(article.id)
                router.push("/")
            } catch (error) {
                console.error("Ошибка при удалении статьи:", error)
                alert("Не удалось удалить статью")
            }
        }
    }

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    if (!article) return <div>Статья не найдена</div>

    return (
        <main className="min-h-[79vh] flex justify-center bg-[rgb(237,237,243)]">
            <div className="w-[630px] mt-8 mr-auto ml-auto mb-8 border-solid border-[rgba(166,166,166,0.463)] rounded-xl bg-white">
                <img className="rounded-t-xl" src={article?.main_image_url} />

                <div className="p-4">
                    <div className="flex items-center gap-3 font-sans mb-8">
                        <div className="w-12 h-12 bg-[#ccc] rounded-[50%] flex items-center justify-center">
                            <UserRound className="w-10 h-10" />
                        </div>

                        <div className="flex flex-col">
                            <p>{article.username}</p>
                            <p className="m-0 text-sm font-normal text-[#929292] flex gap-1.5">
                                <span>{formatDate(article?.created_date)}</span>
                                <span className='font-semibold'>•</span>
                                <span>{article.time_reading} мин. читать</span>
                            </p>
                        </div>

                        {
                            userStore.getUser()?.id === article.user_id
                            &&
                            <div className="ml-auto flex gap-2.5">
                                <button onClick={() => router.push(`/editor/${article.id}`)} className="border-2 rounded-2xl w-25 h-10 bg-amber-300 border-amber-500 cursor-pointer hover:bg-amber-600">Изменить</button>
                                <button onClick={handleDelete} className="border-2 rounded-2xl w-25 h-10 bg-red-300 border-red-500 cursor-pointer hover:bg-red-600">Удалить</button>
                            </div>
                        }
                    </div>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
                </div>
            </div>
        </main>
    )
})

export default ArticlePage