import { FileType } from '@/types/FileType'
import { Dispatch, SetStateAction } from 'react'

export interface FileAdminPanelProps {
    isAddModalOpen: boolean
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedFile: FileType | null
    setSelectedFile: Dispatch<SetStateAction<FileType | null>>
}
