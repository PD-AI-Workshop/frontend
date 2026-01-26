import CategoryTable from './CategoryTable'
import EditCategoryModal from './EditCategoryModal'
import AddCategoryModal from './AddCategoryModal'
import { CategoryAdminPanelPropsType } from '@/types/CategoryAdminPanelPropsType'

const CategoryAdminPage = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,
}: CategoryAdminPanelPropsType) => {
    return (
        <>
            <CategoryTable
                setIsAddModalOpen={setIsAddModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setSelectedItem={setSelectedItem}
            />

            <EditCategoryModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedItem={selectedItem}
            />

            <AddCategoryModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        </>
    )
}

export default CategoryAdminPage
