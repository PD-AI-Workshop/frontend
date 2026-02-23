'use client'

import ArticleEditor from '@/components/ArticleEditor'
import Spinner from '@/components/Spinner'
import { useArticleEditor } from '@/hooks/useArticleEditor'
import { observer } from 'mobx-react-lite'

const EditArticlePage = () => {
    const { articleData, setArticleData, editorRef, editorContent, isLoading, handleSubmit } = useArticleEditor({ mode: 'edit' })

    if (isLoading) return <Spinner />

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
