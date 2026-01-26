'use client'

import AuthorInfo from '@/components/AuthorInfo'
import Spinner from '@/components/Spinner'
import { useArticle } from '@/hooks/useArticle'
import { useArticleActions } from '@/hooks/useArticleActions'
import { useStores } from '@/hooks/useStores'
import { observer } from 'mobx-react-lite'
import { useParams } from 'next/navigation'
import Prism from 'prismjs'
import { useEffect, useRef } from 'react'

const ArticlePage = observer(() => {
    const { articleStore, userStore } = useStores()
    const id = useParams().id?.toString()
    const { isLoading, error, content } = useArticle(id)
    const article = articleStore.currentArticle
    const currentUser = userStore.getUser()
    const contentRef = useRef<HTMLDivElement>(null)
    const actionButtons = useArticleActions(article, articleStore, currentUser)

    useEffect(() => {
        if (content && contentRef.current) {
            Prism.highlightAllUnder(contentRef.current)
        }
    }, [content])

    if (isLoading) return <Spinner />
    if (error || !article) return <div className='flex justify-center items-center text-red-500'>Ошибка: {error}</div>

    return (
        <main className="min-h-[79vh] p-2 flex justify-center">
            <div className="w-[72rem] mt-8 mr-auto ml-auto mb-8 border-1 border-solid border-[rgb(131,131,131)] rounded-xl md:w-[1000px]">
                <img className="rounded-t-xl" src={article?.main_image_url} />

                <div className="p-4">
                    <div className="flex items-center gap-3 font-sans mb-8">
                        <AuthorInfo
                            username={article.username}
                            created_date={article.created_date}
                            time_reading={article.time_reading}
                        />

                        {actionButtons}
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
