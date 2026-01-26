import { MyEditorHandlePropsType } from './MyEditorHandlePropsType'
import { ArticleDataType } from './ArticleTypes'

export type ArticleEditorPropsType = {
    mode: 'edit' | 'create'
    articleData: ArticleDataType
    setArticleData: (value: React.SetStateAction<ArticleDataType>) => void
    handleSubmit: () => Promise<void>
    editorRef: React.RefObject<MyEditorHandlePropsType | null>
    initialEditorContent?: string
}
