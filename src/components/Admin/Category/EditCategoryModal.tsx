import { useStores } from '@/hooks/useStores'
import { EditCategoryModalPropsType } from '@/types/CategoryAdminPanelPropsType'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'

const EditCategoryModal = ({ isEditModalOpen, setIsEditModalOpen, selectedItem }: EditCategoryModalPropsType) => {
    const [form] = useForm()
    const { categoryStore } = useStores()
    const onCancel = () => setIsEditModalOpen(false)

    useEffect(() => {
        if (isEditModalOpen && selectedItem) {
            form.setFieldsValue(selectedItem)
        }
    }, [isEditModalOpen, selectedItem])

    const handleEdit = async () => {
        if (!selectedItem) return

        const values = await form.validateFields()
        await categoryStore.update(selectedItem.id, values)

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
