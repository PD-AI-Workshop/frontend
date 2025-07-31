import { ArticleDataType } from '@/types/ArticleDataType'
import { RefObject, SetStateAction } from 'react'
import { MyEditorHandleProps } from './MyEditorHandleProps'

export interface ArticleEditorProps {
    mode: 'edit' | 'create'
    articleData: ArticleDataType
    setArticleData: (value: SetStateAction<ArticleDataType>) => void
    handleSubmit: () => Promise<void>
    editorRef: RefObject<MyEditorHandleProps | null>
    initialEditorContent?: string
}
