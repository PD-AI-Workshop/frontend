import { UserType } from "@/types/UserType"
import { Dispatch, SetStateAction } from "react"
import UserTable from "./UserTable"
import EditUserModal from "./EditUserModal"

export interface UserAdminPanelProps {
    isEditModalOpen: boolean
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    selectedUser: UserType | null
    setSelectedUser: Dispatch<SetStateAction<UserType | null>>
}

const UserAdminPanel = ({
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    setSelectedUser
}: UserAdminPanelProps) => {
    return (
        <>
            <UserTable
                setIsEditModalOpen={setIsEditModalOpen}
                setSelectedUser={setSelectedUser}
            /> 

            <EditUserModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                selectedUser={selectedUser}
            />
        </>
    )
}

export default UserAdminPanel