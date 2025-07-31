import { FileType } from '@/types/FileType'
import { Dispatch, SetStateAction } from 'react'

export interface FileTableProps {
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedFile: Dispatch<SetStateAction<FileType | null>>
}
