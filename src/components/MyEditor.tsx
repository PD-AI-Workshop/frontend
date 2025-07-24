import { Context } from '@/app/StoresProvider';
import { BlobInfoType } from '@/types/BlobInfoType';
import { StoresType } from '@/types/StoresType';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState, useRef, useContext, forwardRef, useImperativeHandle } from 'react';

declare global {
    interface Window {
        tinymce: any
    }
}

export interface MyEditorProps {
    onImageUploaded?: (id: number) => void
}

export interface MyEditorHandle {
    setContent: (html: string) => void
    getContent: () => string
}

const MyEditor = forwardRef<MyEditorHandle, MyEditorProps>(({ onImageUploaded }, ref) => {
    const { fileStore } = useContext(Context) as StoresType
    const [isClient, setIsClient] = useState(false)
    const editorRef = useRef<any>(null)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useImperativeHandle(ref, () => ({
        getContent: () => {
            return editorRef.current ? editorRef.current.getContent() : ''
        },
        setContent: (content: string) => {
            if (editorRef.current) {
                editorRef.current.setContent(content)
            }
        }
    }))

    const handleImageUpload = async (blobInfo: BlobInfoType): Promise<string> => {
        const file = new File([blobInfo.blob()], blobInfo.filename(), {
            type: blobInfo.blob().type
        })
        const formData = new FormData()

        formData.append('file', file)
        const createdFile = await fileStore.create(formData)

        if (onImageUploaded) {
            onImageUploaded(createdFile.id);
        }

        return createdFile.url
    }

    return (
        <div>
            {isClient ?
                <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    onInit={(_, editor) => editorRef.current = editor}
                    init={{
                        height: 600,
                        width: 900,
                        highlight_on_focus: false,
                        menubar: true,
                        plugins: 'advlist lists link image charmap table code help wordcount',
                        toolbar: 'formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | image code',
                        image_uploadtab: true,
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
                                    const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                                    cb(placeholder, { title: file.name })

                                    const formData = new FormData()
                                    formData.append('file', file)
                                    const response = await fileStore.create(formData)

                                    if (onImageUploaded) {
                                        onImageUploaded(response.id);
                                    }

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
                        }
                    }}
                />
                : <div />}
        </div>
    );
})

export default MyEditor;