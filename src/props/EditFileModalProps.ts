import { FileType } from '@/types/FileType'

export interface EditFileModalProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: (value: boolean) => void
    selectedFile: FileType | null
}
