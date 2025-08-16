import { CategoryType } from '@/types/CategoryTypes'
import { Dispatch, SetStateAction } from 'react'

export interface CategoryTableProps {
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>
}
