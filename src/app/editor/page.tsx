'use client'

import { MyEditorHandle } from '@/components/MyEditor'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CreateArticleType } from '@/types/CreateArticleType'
import { useRouter } from 'next/navigation'
import ArticleEditor from '@/components/ArticleEditor'
import { useStores } from '@/hooks/useStores'

const EditorPage = () => {
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

    const handleSubmit = async () => {
        if (!articleData.main_image_url) {
            alert('Ошибка при создании статьи')
            return
        }

        const content = editorRef.current?.getContent() || ''
        const blob = new Blob([content], { type: 'text/html' })
        const htmlFile = new File([blob], 'content.html', { type: 'text/html' })

        try {
            const formData = new FormData()
            formData.append('file', htmlFile)
            const textFile = await fileStore.create(formData)

            const article: CreateArticleType = {
                ...articleData,
                text_id: textFile.id,
            }

            await articleStore.create(article)
            alert('Статья успешно создана!')
            router.push('/')
        } catch (error) {
            alert('Ошибка при создании статьи')
            console.error(error)
        }
    }

    return (
        <ArticleEditor
            mode="create"
            articleData={articleData}
            setArticleData={setArticleData}
            handleSubmit={handleSubmit}
            editorRef={editorRef}
        />
    )
}

export default observer(EditorPage)
