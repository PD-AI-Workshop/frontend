import { Context } from "@/app/StoresProvider"
import { FileType } from "@/types/FileType"
import { StoresType } from "@/types/StoresType"
import { Button, Form, Modal, Upload } from "antd"
import { useForm } from "antd/es/form/Form"
import { useContext, useEffect } from "react"

export interface EditFileModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedFile: FileType | null
}

const EditFileModal = ({ isEditModalOpen, setIsEditModalOpen, selectedFile }: EditFileModalProps) => {
    const [form] = useForm()
    const { fileStore } = useContext(Context) as StoresType
    const onCancel = () => setIsEditModalOpen(false)
    const rules = [{ required: true, message: 'Выберите файл' }]
    const beforeUpload = () => false

    useEffect(() => {
        if (isEditModalOpen && selectedFile) {
            form.setFieldsValue(selectedFile)
        }
    }, [isEditModalOpen, selectedFile])

    const handleEdit = async () => {
        if (!selectedFile) return

        const values = await form.validateFields()

        if (!values.file || values.file.length === 0) return

        const formData = new FormData()

        formData.append('file', values.file[0].originFileObj)
        await fileStore.update(selectedFile.id, formData)
        setIsEditModalOpen(false)
        form.resetFields()
    }

    return (
        <Modal
            title="Редактирование файла"
            open={isEditModalOpen}
            onOk={handleEdit}
            onCancel={onCancel}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Файл"
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={e => e.fileList}
                    rules={rules}
                >
                    <Upload accept="files/*" maxCount={1} beforeUpload={beforeUpload}>
                        <Button>Выбрать файл</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditFileModal