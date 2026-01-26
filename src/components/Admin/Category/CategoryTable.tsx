import { CategoryType } from '@/types/CategoryTypes'
import ActionButtons from '../ActionButtons'
import GenericTable from '../GenericTable'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks/useStores'
import { CategoryTablePropsType } from '@/types/CategoryAdminPanelPropsType'

const CategoryTable = ({ setIsAddModalOpen, setIsEditModalOpen, setSelectedItem }: CategoryTablePropsType) => {
    const { categoryStore } = useStores()
    const categories = categoryStore.getCategories()
    const onEdit = (category: CategoryType) => {
        setSelectedItem(category)
        setIsEditModalOpen(true)
    }
    const onDelete = async (category: CategoryType) => {
        await categoryStore.delete(category.id)
        await categoryStore.fetch()
    }
    const onAdd = () => setIsAddModalOpen?.(true)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название', dataIndex: 'name', key: 'name' },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: CategoryType) => (
                <ActionButtons<CategoryType>
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    confirmDeleteMessage="Вы уверены, что хотите удалить категорию?"
                />
            ),
        },
    ]

    return <GenericTable dataSource={categories} columns={columns} onAdd={onAdd} />
}

export default observer(CategoryTable)
