'use client'

import MyEditor, { MyEditorHandle } from "@/components/MyEditor";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../StoresProvider";
import { StoresType } from "@/types/StoresType";
import { observer } from "mobx-react-lite";
import { Button, ConfigProvider, Input, InputNumber, Select, theme, Upload, UploadProps } from 'antd'
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { CreateArticleType } from "@/types/CreateArticleType";
import { useRouter } from "next/navigation";

const EditorPage = () => {
    const { categoryStore, fileStore, articleStore, themeStore } = useContext(Context) as StoresType
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [time_reading, setTimeReading] = useState<number>(0)
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [uploadedImageIds, setUploadedImageIds] = useState<number[]>([])
    const editorRef = useRef<MyEditorHandle>(null)
    const router = useRouter()
    const isDarkMode = themeStore.isDarkMode

    useEffect(() => {
        categoryStore.fetch()
    }, [categoryStore])

    const handleImageUploaded = (id: number) => {
        setUploadedImageIds(prev => [...prev, id])
    }

    const optionCategories = categoryStore.getCategories().map(category => ({
        value: category.id,
        label: `${category.name}`
    }))

    const handleCustomRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
        const formData = new FormData()
        formData.append('file', file as RcFile)

        setLoading(true)
        try {
            const file = await fileStore.create(formData)

            if (file.url) {
                setImageUrl(file.url)
                if (onSuccess) onSuccess(file, new XMLHttpRequest())
            } else {
                throw new Error('Неверный формат ответа сервера')
            }
        } catch (error: any) {
            if (onError) onError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (imageUrl === null) {
            alert("Ошибка при создании статьи")
            return
        }

        const content = editorRef.current?.getContent() || '';
        const blob = new Blob([content], { type: 'text/html' })
        const htmlFile = new File([blob], 'content.html', { type: 'text/html' })

        try {
            const formData = new FormData()
            formData.append('file', htmlFile)
            const textFile = await fileStore.create(formData)

            const article: CreateArticleType = {
                title,
                time_reading,
                main_image_url: imageUrl,
                text_id: textFile.id,
                category_ids: selectedCategories,
                image_ids: uploadedImageIds
            }

            await articleStore.create(article)
            alert("Статья успешно создана!")
            router.push('/')
        } catch (error) {
            alert("Ошибка при создании статьи")
            console.error(error)
        }
    }

    return (
        <main className="min-h-[79vh] flex p-2 items-center flex-col">
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
                }}
            >
                <h1 className="mt-5 text-2xl font-bold mb-5">Редактор статьи</h1>

                <Upload
                    customRequest={handleCustomRequest}
                    disabled={loading}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
                </Upload>

                {imageUrl && (
                    <div className="mt-4">
                        <h3 className="font-medium mb-2">Предпросмотр:</h3>
                        <img
                            src={imageUrl}
                            alt="Uploaded preview"
                            className="max-w-full max-h-60 object-contain border rounded"
                        />
                    </div>
                )}

                <div className="flex flex-col mt-4">
                    <label className="font-medium text-xl" htmlFor="title">Заголовок статьи</label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '50vh', marginBottom: '10px', fontSize: '20px' }}
                    />

                    <MyEditor isDarkMode={isDarkMode} ref={editorRef} onImageUploaded={handleImageUploaded} />

                    <div className="flex flex-row justify-between items-center mt-4 mb-4">
                        <Select
                            style={{ width: '200px' }}
                            mode="multiple"
                            placeholder="Выберите категории"
                            options={optionCategories}
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                        />

                        <InputNumber
                            min={0}
                            defaultValue={0}
                            value={time_reading}
                            onChange={(value) => (value != null) ? setTimeReading(value) : setTimeReading(0)}
                            style={{ width: '50px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-indigo-600 text-white mb-4 w-auto py-3 px-4 rounded-3xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Опубликовать
                    </button>
                </div>
            </ConfigProvider>
        </main>
    );
}

export default observer(EditorPage)
