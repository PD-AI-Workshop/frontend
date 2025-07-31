import { useStores } from '@/hooks/useStores'
import { EditCategoryModalProps } from '@/props/EditCategoryModalProps'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'

const EditCategoryModal = ({ isEditModalOpen, setIsEditModalOpen, selectedCategory }: EditCategoryModalProps) => {
    const [form] = useForm()
    const { categoryStore } = useStores()
    const onCancel = () => setIsEditModalOpen(false)

    useEffect(() => {
        if (isEditModalOpen && selectedCategory) {
            form.setFieldsValue(selectedCategory)
        }
    }, [isEditModalOpen, selectedCategory])

    const handleEdit = async () => {
        if (!selectedCategory) return

        const values = await form.validateFields()
        await categoryStore.update(selectedCategory.id, values)

        setIsEditModalOpen(false)
    }

    return (
        <Modal title="Редактирование категории" open={isEditModalOpen} onOk={handleEdit} onCancel={onCancel}>
            <Form layout="vertical" form={form}>
                <Form.Item label="Название" name="name">
                    <Input style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditCategoryModal
