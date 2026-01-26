import { useParams, useRouter } from "next/navigation"
import { useStores } from "./useStores"
import { useCallback, useEffect, useRef, useState } from "react"
import { MyEditorHandlePropsType } from "@/types/MyEditorHandlePropsType"
import { CreateArticleType, UpdateArticleType } from "@/types/ArticleTypes"
import { ArticleDataType } from "@/types/ArticleTypes"

export const useArticleEditor = ({ mode }: { mode: 'create' | 'edit' }) => {
    const { fileStore, articleStore } = useStores()
    const router = useRouter()
    const params = useParams()
    const id = params.id?.toString()
    const [editorContent, setEditorContent] = useState('')
    const [isLoading, setIsLoading] = useState(mode === 'edit')
    const editorRef = useRef<MyEditorHandlePropsType>(null)

    const [articleData, setArticleData] = useState<ArticleDataType>({
        main_image_url: '',
        title: '',
        time_reading: 0,
        category_ids: [],
        image_ids: [],
    })

    useEffect(() => {
        const loadArticle = async () => {
            if (mode !== 'edit' || !id) return

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
                alert('Ошибка загрузки статьи')
            } finally {
                setIsLoading(false)
            }
        }

        loadArticle()
    }, [mode, id, articleStore, fileStore, router])

    const prepareContentFile = useCallback(async () => {
        const content = editorRef.current?.getContent() || ''
        const blob = new Blob([content], { type: 'text/html' })

        return new File([blob], 'content.html', { type: 'text/html' })
    }, [])

    const uploadContentFile = useCallback(async (htmlFile: File) => {
        const formData = new FormData()
        formData.append('file', htmlFile)
        
        return await fileStore.create(formData)
    }, [fileStore])

    const handleSubmit = useCallback(async () => {
        if (!articleData.main_image_url) {
            alert('Загрузите главное изображение')
            return
        }

        try {
            const htmlFile = await prepareContentFile()
            const textFile = await uploadContentFile(htmlFile)

            if (mode === 'create') {
                const article: CreateArticleType = {
                    ...articleData,
                    text_id: textFile.id,
                }

                await articleStore.create(article)

                alert('Статья успешно создана!')
                router.push('/')
            } else if (mode === 'edit' && id) {
                const article: UpdateArticleType = {
                    ...articleData,
                    text_id: textFile.id,
                }

                await articleStore.update(parseInt(id), article)

                alert('Статья обновлена!')
                router.push(`/article/${id}`)
            }
        } catch (error) {
            alert(`Ошибка при ${mode === 'create' ? 'создании' : 'обновлении'} статьи`)
            console.error(error)
        }

    }, [articleData, mode, id, articleStore, router, prepareContentFile, uploadContentFile])

    return {
        articleData,
        setArticleData,
        editorRef,
        editorContent,
        isLoading,
        handleSubmit,
    }
}