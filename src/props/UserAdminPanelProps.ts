import { UserType } from '@/types/UserTypes'
import { Dispatch, SetStateAction } from 'react'

export interface UserAdminPanelProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedUser: UserType | null
    setSelectedUser: Dispatch<SetStateAction<UserType | null>>
}
