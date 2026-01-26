import { UserType } from '@/types/UserTypes'
import ActionButtons from '../ActionButtons'
import GenericTable from '../GenericTable'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks/useStores'
import { UserTablePropsType } from '@/types/UserAdminPanelPropsType'

const UserTable = ({ setIsEditModalOpen, setSelectedItem }: UserTablePropsType) => {
    const { userStore } = useStores()
    const users = userStore.getUsers()
    const onEdit = (user: UserType) => {
        setSelectedItem(user)
        setIsEditModalOpen(true)
    }
    const onDelete = async (user: UserType) => {
        await userStore.delete(user.id)
        await userStore.fetch()
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Имя пользователя', dataIndex: 'username', key: 'username' },
        { title: 'Почта', dataIndex: 'email', key: 'email' },
        { title: 'Роль', dataIndex: 'role', key: 'role' },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: UserType) => (
                <ActionButtons<UserType>
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    confirmDeleteMessage="Вы уверены, что хотите удалить пользователя?"
                />
            ),
        },
    ]

    return <GenericTable dataSource={users} columns={columns} />
}

export default observer(UserTable)
