import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useStores } from '@/hooks/useStores'
import { MyEditorHandleProps } from '@/props/MyEditorHandleProps'
import { MyEditorProps } from '@/props/MyEditorProps'
import { BlobInfoType } from '@/types/BlobInfoType'
import { Editor } from '@tinymce/tinymce-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'

const MyEditor = forwardRef<MyEditorHandleProps, MyEditorProps>(
    ({ onImageUploaded, isDarkMode, initialContent }, ref) => {
        const { fileStore } = useStores()
        const [isClient, setIsClient] = useState(false)
        const editorRef = useRef<any>(null)
        const isMobile = useMobileDetect()
        const [isInitialized, setIsInitialized] = useState(false)

        useEffect(() => setIsClient(true), [])

        useEffect(() => {
            if (isInitialized && editorRef.current && initialContent !== undefined) {
                editorRef.current.setContent(initialContent)
            }
        }, [initialContent, isInitialized])

        useImperativeHandle(ref, () => ({
            getContent: () => (editorRef.current ? editorRef.current.getContent() : ''),
            setContent: (content: string) => {
                if (editorRef.current) editorRef.current.setContent(content)
            },
        }))

        const handleImageUpload = async (blobInfo: BlobInfoType): Promise<string> => {
            const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type })
            const formData = new FormData()

            formData.append('file', file)
            const createdFile = await fileStore.create(formData)

            if (onImageUploaded) onImageUploaded(createdFile.id)

            return createdFile.url
        }

        return (
            <div>
                {isClient ? (
                    <Editor
                        tinymceScriptSrc="/tinymce/tinymce.min.js"
                        onInit={(_, editor) => {
                            editorRef.current = editor
                            if (initialContent !== undefined) {
                                editor.setContent(initialContent)
                            }
                            setIsInitialized(true)
                        }}
                        init={{
                            skin: `${isDarkMode ? 'oxide-dark' : 'oxide'}`,
                            content_css: `${isDarkMode ? 'dark' : 'default'}`,
                            height: 600,
                            width: isMobile ? 'auto' : 900,
                            highlight_on_focus: false,
                            menubar: true,
                            plugins: 'advlist lists link image charmap table help wordcount codesample',
                            toolbar:
                                'formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | image codesample',
                            image_uploadtab: true,
                            relative_urls: false,
                            remove_script_host: false,
                            convert_urls: false,
                            images_upload_handler: handleImageUpload,
                            file_picker_types: 'image',
                            file_picker_callback: (cb) => {
                                const input = document.createElement('input')
                                input.setAttribute('type', 'file')
                                input.setAttribute('accept', 'image/*')
                                input.addEventListener('change', async (e) => {
                                    const target = e.target as HTMLInputElement
                                    if (!target.files || target.files.length === 0) return

                                    const file = target.files[0]

                                    try {
                                        const placeholder =
                                            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                                        cb(placeholder, { title: file.name })

                                        const formData = new FormData()
                                        formData.append('file', file)
                                        const response = await fileStore.create(formData)

                                        if (onImageUploaded) onImageUploaded(response.id)

                                        if (editorRef.current) {
                                            editorRef.current.setContent(
                                                editorRef.current.getContent().replace(placeholder, response)
                                            )
                                        }
                                    } catch (error) {
                                        console.error('Ошибка загрузки:', error)
                                    }
                                })
                                input.click()
                            },
                        }}
                    />
                ) : (
                    <div>Загрузка редактора...</div>
                )}
            </div>
        )
    }
)

export default observer(MyEditor)
