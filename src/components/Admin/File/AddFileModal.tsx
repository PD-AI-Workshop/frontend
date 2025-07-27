import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { Button, Form, Modal, Upload } from "antd"
import { useForm } from "antd/es/form/Form"
import { useContext } from "react"

export interface AddFileModalProps {
    isAddModalOpen: boolean
    setIsAddModalOpen: (value: boolean) => void
}

const AddFileModal = ({ isAddModalOpen, setIsAddModalOpen }: AddFileModalProps) => {
    const [form] = useForm()
    const { fileStore } = useContext(Context) as StoresType
    const onCancel = () => setIsAddModalOpen(false)
    const rules = [{ required: true, message: 'Выберите файл' }]
    const beforeUpload = () => false

    const handleSave = async () => {
        const values = await form.validateFields()

        if (!values.file || values.file.length === 0) {
            return
        }

        const formData = new FormData()
        formData.append('file', values.file[0].originFileObj)

        await fileStore.create(formData)

        setIsAddModalOpen(false)
        form.resetFields()
    }

    return (
        <Modal
            title='Добавление файла'
            open={isAddModalOpen}
            onOk={handleSave}
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

export default AddFileModal