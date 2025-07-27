import { Context } from "@/app/StoresProvider"
import { StoresType } from "@/types/StoresType"
import { UserType } from "@/types/UserType"
import { Checkbox, Form, Input, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export interface EditUserModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedUser: UserType | null
}

const EditUserModal = ({ isEditModalOpen, setIsEditModalOpen, selectedUser }: EditUserModalProps) => {
    const [form] = useForm()
    const { userStore } = useContext(Context) as StoresType
    const onCancel = () => setIsEditModalOpen(false)
    const router = useRouter()

    useEffect(() => {
        if (isEditModalOpen && selectedUser) {
            form.setFieldsValue(selectedUser)
        }
    }, [isEditModalOpen, selectedUser])

    const handleEdit = async () => {
        if (!selectedUser) return

        const values = await form.validateFields()
        await userStore.update(selectedUser.id, values)
        await userStore.fetch()

        setIsEditModalOpen(false)
    }

    return (
        <Modal
            title='Редактирование пользователя'
            open={isEditModalOpen}
            onOk={handleEdit}
            onCancel={onCancel}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{ message: 'Введите имя пользователя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', message: 'Некорректный email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Роль"
                    name="role"
                    rules={[{ message: 'Выберите роль' }]}
                >
                    <Select>
                        <Select.Option value="user">Пользователь</Select.Option>
                        <Select.Option value="admin">Администратор</Select.Option>
                        <Select.Option value="writer">Писатель</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Активный"
                    name="is_active"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item
                    label="Суперпользователь"
                    name="is_superuser"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item
                    label="Почта подтверждена"
                    name="is_verified"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUserModal