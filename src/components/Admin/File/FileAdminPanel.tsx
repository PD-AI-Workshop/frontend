import FileTable from './FileTable'
import EditFileModal from './EditFileModal'
import AddFileModal from './AddFileModal'
import { FileAdminPanelProps } from '@/props/FileAdminPanelProps'
import { Button } from 'antd'
import { useStores } from '@/hooks/useStores'

const FileAdminPanel = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedFile,
    setSelectedFile,
}: FileAdminPanelProps) => {
    const { fileStore } = useStores()

    return (
        <>
            <Button onClick={() => fileStore.delete_all_unused()} type="primary" className='mb-4'>Удалить неиспользуемые файлы</Button>

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
