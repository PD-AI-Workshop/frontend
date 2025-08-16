import { useStores } from '@/hooks/useStores'
import { EditFileModalProps } from '@/props/EditFileModalProps'
import { Button, Form, Modal, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'

const EditFileModal = ({ isEditModalOpen, setIsEditModalOpen, selectedFile }: EditFileModalProps) => {
    const [form] = useForm()
    const { fileStore } = useStores()
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
        <Modal title="Редактирование файла" open={isEditModalOpen} onOk={handleEdit} onCancel={onCancel}>
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Файл"
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
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
