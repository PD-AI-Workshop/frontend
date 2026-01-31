import { Button, Input, InputNumber, Select, Upload, UploadProps, message } from 'antd'
import MyEditor from './MyEditor'
import { useEffect, useState } from 'react'
import { RcFile } from 'antd/es/upload'
import { ArticleEditorPropsType } from '@/types/ArticleEditorPropsType'
import { useStores } from '@/hooks/useStores'
import { UploadIcon } from 'lucide-react'
import clsx from 'clsx'

const ArticleEditor = ({
    mode,
    articleData,
    setArticleData,
    handleSubmit,
    editorRef,
    initialEditorContent,
}: ArticleEditorPropsType) => {
    const { categoryStore, themeStore, fileStore } = useStores()
    const [messageApi, contextHolder] = message.useMessage()

    const [loading, setLoading] = useState({
        article: false,
        image: false,
    })

    useEffect(() => {
        categoryStore.fetch()
    }, [])

    const optionCategories = categoryStore.getCategories().map((category) => ({
        value: category.id,
        label: `${category.name}`,
    }))

    const updateArticleData = <K extends keyof typeof articleData>(field: K, value: (typeof articleData)[K]) => {
        setArticleData((prev) => ({ ...prev, [field]: value }))
    }

    const handleImageUploaded = (id: number) => {
        setArticleData((prev) => ({
            ...prev,
            image_ids: [...prev.image_ids, id],
        }))
    }

    const checkImageDimensions = (file: RcFile): Promise<boolean> => {
        return new Promise((resolve, _) => {
            const img = new Image()
            img.src = URL.createObjectURL(file)

            img.onload = () => {
                URL.revokeObjectURL(img.src)
                const { width, height } = img

                if (width >= 1280 && height >= 720) {
                    resolve(true)
                } else {
                    messageApi.open({
                        type: 'error',
                        content: `Изображение должно быть не менее 1280x720 пикселей. Текущий размер: ${width}x${height} пикселей`,
                    })
                    resolve(false)
                }
            }
        })
    }

    const beforeUpload: UploadProps['beforeUpload'] = async (file: RcFile) => {
        return await checkImageDimensions(file)
    }

    const handleCustomRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
        const formData = new FormData()
        formData.append('file', file as RcFile)

        setLoading((prev) => ({ ...prev, image: true }))
        try {
            const file = await fileStore.create(formData)

            if (file.url) {
                setArticleData((prev) => ({
                    ...prev,
                    main_image_url: file.url,
                }))
                if (onSuccess) onSuccess(file, new XMLHttpRequest())
            } else {
                throw new Error('Неверный формат ответа сервера')
            }
        } catch (error: any) {
            if (onError) onError(error)
        } finally {
            setLoading((prev) => ({ ...prev, image: false }))
        }
    }

    return (
        <main className="min-h-[79vh] flex p-4 items-center flex-col">
            {contextHolder}
            <h1 className="mt-5 text-2xl font-bold mb-5">Редактор статьи</h1>

            <div className="flex flex-col justify-center items-center">
                <Upload
                    customRequest={handleCustomRequest}
                    beforeUpload={beforeUpload}
                    disabled={loading.image}
                    showUploadList={false}
                    accept="image/*"
                >
                    <Button icon={<UploadIcon />}>Загрузить файл</Button>
                </Upload>
                <p className="text-sm mt-2 text-white">
                    *Основное изображение статьи должно быть не менее 1280×720 пикселей
                </p>
            </div>

            {articleData.main_image_url && (
                <div className="mt-4">
                    <h3 className="font-medium mb-2">Предпросмотр:</h3>
                    <img
                        src={articleData.main_image_url}
                        alt="Uploaded preview"
                        className="max-w-full max-h-60 object-contain border rounded"
                    />
                </div>
            )}

            <div className="flex flex-col mt-4">
                <label className="font-medium text-xl mb-2" htmlFor="title">
                    Заголовок статьи
                </label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={articleData.title}
                    onChange={(e) => updateArticleData('title', e.target.value)}
                    style={{ width: '50vh', marginBottom: '10px', fontSize: '20px' }}
                />

                <MyEditor
                    isDarkMode={themeStore.isDarkMode}
                    ref={editorRef}
                    onImageUploaded={handleImageUploaded}
                    initialContent={initialEditorContent}
                />

                <div className="flex flex-row justify-between items-center mt-4 mb-4">
                    <div>
                        <label className="flex mb-2" htmlFor="categories">
                            Выберите категории:
                        </label>
                        <Select
                            id="categories"
                            className="w-48"
                            mode="multiple"
                            placeholder="Выберите категории"
                            options={optionCategories}
                            value={articleData.category_ids}
                            onChange={(value) => updateArticleData('category_ids', value)}
                        />
                    </div>

                    <div className="flex flex-col items-end">
                        <label className="mb-2" htmlFor="time_reading">
                            Время чтения (мин.):
                        </label>
                        <InputNumber
                            id="time_reading"
                            name="time_reading"
                            min={0}
                            defaultValue={0}
                            value={articleData.time_reading}
                            onChange={(value) => updateArticleData('time_reading', value || 0)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={clsx(
                        'text-white mb-2 w-auto py-3 px-4 rounded-3xl transition-colors',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2',
                        {
                            'bg-amber-600 hover:bg-amber-700': mode === 'edit',
                            'bg-indigo-600 hover:bg-indigo-700': mode !== 'edit'
                        }
                    )}
                >
                    {mode === 'edit' ? 'Изменить' : 'Опубликовать'}
                </button>
            </div>
        </main>
    )
}

export default ArticleEditor
