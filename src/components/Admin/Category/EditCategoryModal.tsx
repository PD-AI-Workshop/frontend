import { Context } from "@/app/StoresProvider"
import { CategoryType } from "@/types/CategoryType"
import { StoresType } from "@/types/StoresType"
import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import { useContext, useEffect } from "react"

export interface EditCategoryModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedCategory: CategoryType | null
}

const EditCategoryModal = ({ isEditModalOpen, setIsEditModalOpen, selectedCategory }: EditCategoryModalProps) => {
    const [form] = useForm()
    const { categoryStore } = useContext(Context) as StoresType
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
        <Modal
            title='Редактирование категории'
            open={isEditModalOpen}
            onOk={handleEdit}
            onCancel={onCancel}
        >
            <Form layout="vertical" form={form}>
                <Form.Item label="Название" name="name">
                    <Input style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditCategoryModal