import { CategoryType } from "@/types/CategoryType"
import { Dispatch, SetStateAction } from "react"
import CategoryTable from "./CategoryTable"
import EditCategoryModal from "./EditCategoryModal"
import AddCategoryModal from "./AddCategoryModal"

export interface CategoryAdminPageProps {
    isAddModalOpen: boolean
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedCategory: CategoryType | null
    setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>
}

const CategoryAdminPage = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedCategory,
    setSelectedCategory
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

            <AddCategoryModal
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
            />
        </>
    )
}

export default CategoryAdminPage