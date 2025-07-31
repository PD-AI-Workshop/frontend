import { UserType } from '@/types/UserTypes'

export interface EditUserModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedUser: UserType | null
}
