import UserTable from './UserTable'
import EditUserModal from './EditUserModal'
import { UserAdminPanelPropsType } from '@/types/UserAdminPanelPropsType'

const UserAdminPanel = ({
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,
}: UserAdminPanelPropsType) => {
    return (
        <>
            <UserTable setIsEditModalOpen={setIsEditModalOpen} setSelectedItem={setSelectedItem} />

            <EditUserModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedItem={selectedItem}
            />
        </>
    )
}

export default UserAdminPanel
