import { Context } from '@/components/StoresProvider'
import { AddCategoryModalProps } from '@/props/AddCategoryModalProps'
import { StoresType } from '@/types/StoresType'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useContext, useEffect } from 'react'

const AddCategoryModal = ({ isAddModalOpen, setIsAddModalOpen }: AddCategoryModalProps) => {
    const [form] = useForm()
    const { categoryStore } = useContext(Context) as StoresType
    const onCancel = () => setIsAddModalOpen(false)

    useEffect(() => {
        if (isAddModalOpen) {
            form.resetFields()
        }
    }, [isAddModalOpen, form])

    const handleSave = async () => {
        const values = await form.validateFields()
        await categoryStore.create(values)
        setIsAddModalOpen(false)
    }

    return (
        <Modal title="Добавление категории" open={isAddModalOpen} onOk={handleSave} onCancel={onCancel}>
            <Form layout="vertical" form={form}>
                <Form.Item label="Название" name="name">
                    <Input style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCategoryModal
