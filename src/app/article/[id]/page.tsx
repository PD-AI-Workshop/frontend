'use client'

import ActionButtons from '@/components/ActionButtons'
import AuthorInfo from '@/components/AuthorInfo'
import { useStores } from '@/hooks/useStores'
import { observer } from 'mobx-react-lite'
import { useParams, useRouter } from 'next/navigation'
import Prism from 'prismjs'
import { useCallback, useEffect, useRef, useState } from 'react'

const ArticlePage = observer(() => {
    const { articleStore, fileStore, userStore } = useStores()
    const router = useRouter()
    const params = useParams()
    const article = articleStore.currentArticle
    const currentUser = userStore.getUser()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const contentRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [content, setContent] = useState<string>()

    useEffect(() => {
        if (content && contentRef.current) Prism.highlightAllUnder(contentRef.current)
    }, [content])

    useEffect(() => {
        let isMounted = true

        const fetchArticle = async () => {
            if (!id || isNaN(parseInt(id))) return

            try {
                setIsLoading(true)
                setContent(undefined)
                setError(null)

                articleStore.setCurrentArticle(null)

                const articleId = parseInt(id)
                await articleStore.getById(articleId)
                const fetchedArticle = articleStore.currentArticle

                if (!fetchedArticle) throw new Error('Статья не найдена')

                const file = await fileStore.getById(fetchedArticle.text_id)
                const response = await fetch(file.url)
                const html = await response.text()
                const user = await userStore.getCurrentUser()

                if (user && isMounted) userStore.setUser(user)
                if (isMounted) setContent(html)
            } catch (error) {
                if (isMounted) setError('Ошибка загрузки')
                console.error('Error fetching article:', error)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchArticle()

        return () => {
            isMounted = false
        }
    }, [id, articleStore, fileStore])

    const handleDelete = useCallback(async () => {
        if (!article) return

        if (confirm('Вы уверены, что хотите удалить статью?')) {
            try {
                await articleStore.delete(article.id)
                router.push('/')
            } catch (err) {
                console.error('Delete failed:', err)
                alert('Не удалось удалить статью')
            }
        }
    }, [article, articleStore, router])

    const handleEdit = useCallback(() => router.push(`/editor/${article?.id}`), [article, router])
    const hasEditPermissions = !!article && (currentUser?.id === article.user_id || currentUser?.role === 'admin')

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    if (!article) return <div>Статья не найдена</div>

    return (
        <main className="min-h-[79vh] p-2 flex justify-center">
            <div className="w-[400px] mt-8 mr-auto ml-auto mb-8 border-1 border-solid border-[rgb(131,131,131)] rounded-xl md:w-[630px]">
                <img className="rounded-t-xl" src={article?.main_image_url} />

                <div className="p-4">
                    <div className="flex items-center gap-3 font-sans mb-8">
                        <AuthorInfo
                            username={article.username}
                            created_date={article.created_date}
                            time_reading={article.time_reading}
                        />

                        {hasEditPermissions && <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />}
                    </div>

                    <div
                        ref={contentRef}
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: content || '' }}
                    />
                </div>
            </div>
        </main>
    )
})

export default ArticlePage
