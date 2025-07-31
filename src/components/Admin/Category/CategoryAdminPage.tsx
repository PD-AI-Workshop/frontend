import CategoryTable from './CategoryTable'
import EditCategoryModal from './EditCategoryModal'
import AddCategoryModal from './AddCategoryModal'
import { CategoryAdminPageProps } from '@/props/CategoryAdminPageProps'

const CategoryAdminPage = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedCategory,
    setSelectedCategory,
}: CategoryAdminPageProps) => {
    return (
        <>
            <CategoryTable
                setIsAddModalOpen={setIsAddModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setSelectedCategory={setSelectedCategory}
            />

            <EditCategoryModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedCategory={selectedCategory}
            />

            <AddCategoryModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        </>
    )
}

export default CategoryAdminPage
