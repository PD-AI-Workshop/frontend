import { useEffect, useState } from "react"
import { useStores } from "./useStores"

export const useArticle = (id: string | undefined) => {
    const { articleStore, fileStore, userStore } = useStores()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [content, setContent] = useState<string>()

    useEffect(() => {
        let isMounted = true

        const fetchArticle = async () => {
            if (!id || isNaN(parseInt(id))) {
                setError('Неверный идентификатор статьи')
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
    }, [id, articleStore, fileStore, userStore])

    return {
        isLoading,
        error,
        content,
        setContent
    }
}