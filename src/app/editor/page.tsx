'use client'

import { observer } from 'mobx-react-lite'
import ArticleEditor from '@/components/ArticleEditor'
import { useArticleEditor } from '@/hooks/useArticleEditor'
import Spinner from '@/components/Spinner'

const EditorPage = () => {
    const { articleData, setArticleData, editorRef, isLoading, handleSubmit } = useArticleEditor({ mode: 'create' })

    if (isLoading) return <Spinner />

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
