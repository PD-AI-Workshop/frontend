'use client'

import ArticleEditor from '@/components/ArticleEditor'
import { MyEditorHandle } from '@/components/MyEditor'
import { useStores } from '@/hooks/useStores'
import { UpdateArticleType } from '@/types/UpdateArticleType'
import { observer } from 'mobx-react-lite'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const EditArticlePage = () => {
    const { fileStore, articleStore } = useStores()

    const [articleData, setArticleData] = useState({
        main_image_url: '',
        title: '',
        time_reading: 0,
        category_ids: [] as number[],
        image_ids: [] as number[],
    })

    const editorRef = useRef<MyEditorHandle>(null)
    const router = useRouter()
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const [editorContent, setEditorContent] = useState('')

    useEffect(() => {
        const loadArticle = async () => {
            if (!id) return

            try {
                await articleStore.getById(parseInt(id))
                const article = articleStore.currentArticle

                if (!article) {
                    router.push('/not-found')
                    return
                }

                setArticleData({
                    title: article.title,
                    time_reading: article.time_reading,
                    category_ids: article.category_ids,
                    main_image_url: article.main_image_url,
                    image_ids: article.image_ids || [],
                })

                const file = await fileStore.getById(article.text_id)
                const response = await fetch(file.url)
                const html = await response.text()
                setEditorContent(html)
            } catch (error) {
                console.error('Ошибка загрузки статьи:', error)
            }
        }

        loadArticle()
    }, [id, articleStore, fileStore])

    const handleSubmit = async () => {
        if (!id) return

        if (!articleData.main_image_url) {
            alert('Загрузите главное изображение')
            return
        }

        const content = editorRef.current?.getContent() || ''
        const blob = new Blob([content], { type: 'text/html' })
        const htmlFile = new File([blob], 'content.html', { type: 'text/html' })

        try {
            const formData = new FormData()
            formData.append('file', htmlFile)
            const textFile = await fileStore.create(formData)

            const article: UpdateArticleType = {
                ...articleData,
                text_id: textFile.id,
            }

            await articleStore.update(parseInt(id), article)
            alert('Статья обновлена!')
            router.push(`/article/${id}`)
        } catch (error) {
            alert('Ошибка при обновлении статьи')
            console.error(error)
        }
    }

    return (
        <ArticleEditor
            mode="edit"
            articleData={articleData}
            setArticleData={setArticleData}
            handleSubmit={handleSubmit}
            editorRef={editorRef}
            initialEditorContent={editorContent}
        />
    )
}

export default observer(EditArticlePage)
