import ActionButtons from "@/components/ActionButtons"
import { ArticleStore } from "@/store/ArticleStore"
import { ArticleType } from "@/types/ArticleTypes"
import { UserType } from "@/types/UserTypes"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useArticleActions = (
    article: ArticleType | null,
    articleStore: ArticleStore,
    currentUser: UserType | null
) => {
    const router = useRouter()
    const hasEditPermissions = !!article && (currentUser?.id === article.user_id || currentUser?.role === 'admin')

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

    const handleEdit = useCallback(
        () => router.push(`/editor/${article?.id}`), 
        [article, router]
    )

    if (hasEditPermissions) {
        return <ActionButtons onEdit={handleEdit} onDelete={handleDelete} />
    }

    return null
}