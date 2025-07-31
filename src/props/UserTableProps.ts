import { UserType } from '@/types/UserTypes'
import { Dispatch, SetStateAction } from 'react'

export interface UserTableProps {
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedUser: Dispatch<SetStateAction<UserType | null>>
}
