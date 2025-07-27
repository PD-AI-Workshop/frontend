import { Context } from "@/app/StoresProvider"
import { CategoryType } from "@/types/CategoryType"
import { StoresType } from "@/types/StoresType"
import { Dispatch, SetStateAction, useContext } from "react"
import ActionButtons from "../ActionButtons"
import GenericTable from "../GenericTable"

export interface CategoryTableProps {
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>
}

const CategoryTable = ({ setIsAddModalOpen, setIsEditModalOpen, setSelectedCategory }: CategoryTableProps) => {
    const { categoryStore } = useContext(Context) as StoresType
    const categories = categoryStore.getCategories()
    const onEdit = (category: CategoryType) => {
        setSelectedCategory(category)
        setIsEditModalOpen(true)
    }
    const onDelete = async (category: CategoryType) => {
        await categoryStore.delete(category.id)
        await categoryStore.fetch()
    }
    const onAdd = () => setIsAddModalOpen(true)

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

    return (
        <GenericTable
            dataSource={categories}
            columns={columns}
            onAdd={onAdd}
        /> 
    )
}

export default CategoryTable