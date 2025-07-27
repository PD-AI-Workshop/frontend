import { FileType } from "@/types/FileType"
import { Dispatch, SetStateAction } from "react"
import FileTable from "./FileTable"
import EditFileModal from "./EditFileModal"
import AddFileModal from "./AddFileModal"

export interface FileAdminPanelProps {
    isAddModalOpen: boolean
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedFile: FileType | null
    setSelectedFile: Dispatch<SetStateAction<FileType | null>>
}

const FileAdminPanel = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedFile,
    setSelectedFile,
}: FileAdminPanelProps) => {
    return (
        <>
            <FileTable
                setIsAddModalOpen={setIsAddModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setSelectedFile={setSelectedFile}
            />

            <EditFileModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedFile={selectedFile}
            />

            <AddFileModal
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
            />
        </>
    )
}

export default FileAdminPanel