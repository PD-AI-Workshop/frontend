import { CategoryType } from '@/types/CategoryTypes'

export interface EditCategoryModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedCategory: CategoryType | null
}
