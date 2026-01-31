import { useStores } from '@/hooks/useStores'
import { UserEditModalPropsType } from '@/types/UserAdminPanelPropsType'
import { Checkbox, Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { Option } from 'antd/es/mentions'
import { useEffect } from 'react'

const EditUserModal = ({ isEditModalOpen, setIsEditModalOpen, selectedItem }: UserEditModalPropsType) => {
    const [form] = useForm()
    const { userStore } = useStores()
    const onCancel = () => setIsEditModalOpen(false)

    useEffect(() => {
        if (isEditModalOpen && selectedItem) {
            form.setFieldsValue(selectedItem)
        }
    }, [isEditModalOpen, selectedItem])

    const handleEdit = async () => {
        if (!selectedItem) return

        const values = await form.validateFields()
        await userStore.update(selectedItem.id, values)
        await userStore.fetch()

        setIsEditModalOpen(false)
    }

    return (
        <Modal title="Редактирование пользователя" open={isEditModalOpen} onOk={handleEdit} onCancel={onCancel}>
            <Form layout="vertical" form={form}>
                <Form.Item label="Имя пользователя" name="username" rules={[{ message: 'Введите имя пользователя' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Некорректный email' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Роль" name="role" rules={[{ message: 'Выберите роль' }]}>
                    <Select>
                        <Option value="user">Пользователь</Option>
                        <Option value="admin">Администратор</Option>
                        <Option value="writer">Писатель</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Активный" name="is_active" valuePropName="checked">
                    <Checkbox />
                </Form.Item>

                <Form.Item label="Суперпользователь" name="is_superuser" valuePropName="checked">
                    <Checkbox />
                </Form.Item>

                <Form.Item label="Почта подтверждена" name="is_verified" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUserModal
