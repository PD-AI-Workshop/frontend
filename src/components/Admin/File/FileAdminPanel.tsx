import FileTable from './FileTable'
import EditFileModal from './EditFileModal'
import AddFileModal from './AddFileModal'
import { FileAdminPanelProps } from '@/props/FileAdminPanelProps'

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

            <AddFileModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        </>
    )
}

export default FileAdminPanel
