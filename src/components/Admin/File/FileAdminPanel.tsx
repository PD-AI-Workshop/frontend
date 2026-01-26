import FileTable from './FileTable'
import EditFileModal from './EditFileModal'
import AddFileModal from './AddFileModal'
import { Button } from 'antd'
import { useStores } from '@/hooks/useStores'
import { FileAdminPanelPropsType } from '@/types/FileAdminPanelPropsType'

const FileAdminPanel = ({
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,
}: FileAdminPanelPropsType) => {
    const { fileStore } = useStores()

    return (
        <>
            <Button onClick={() => fileStore.delete_all_unused()} type="primary" className='mb-4'>Удалить неиспользуемые файлы</Button>

            <FileTable
                setIsAddModalOpen={setIsAddModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setSelectedItem={setSelectedItem}
            />

            <EditFileModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedItem={selectedItem}
            />

            <AddFileModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        </>
    )
}

export default FileAdminPanel
