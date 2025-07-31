import { CategoryType } from '@/types/CategoryTypes'
import { Dispatch, SetStateAction } from 'react'

export interface CategoryAdminPageProps {
    isAddModalOpen: boolean
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedCategory: CategoryType | null
    setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>
}
