import UserTable from './UserTable'
import EditUserModal from './EditUserModal'
import { UserAdminPanelProps } from '@/props/UserAdminPanelProps'

const UserAdminPanel = ({
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    setSelectedUser,
}: UserAdminPanelProps) => {
    return (
        <>
            <UserTable setIsEditModalOpen={setIsEditModalOpen} setSelectedUser={setSelectedUser} />

            <EditUserModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedUser={selectedUser}
            />
        </>
    )
}

export default UserAdminPanel
