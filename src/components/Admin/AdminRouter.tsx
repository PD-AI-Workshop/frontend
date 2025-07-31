import { CategoryType } from '@/types/CategoryTypes'
import { FileType } from '@/types/FileType'
import CategoryAdminPage from './Category/CategoryAdminPage'
import { useState } from 'react'
import FileAdminPanel from './File/FileAdminPanel'
import ArticleTable from './Article/ArticleTable'
import UserAdminPanel from './User/UserAdminPanel'
import { UserType } from '@/types/UserTypes'
import { AdminRouterProps } from '@/props/AdminRouterProps'

const AdminRouter = ({ selectedKey }: AdminRouterProps) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

    return (
        <div>
            {(selectedKey === '1' && (
                <CategoryAdminPage
                    isAddModalOpen={isAddModalOpen}
                    setIsAddModalOpen={setIsAddModalOpen}
                    isEditModalOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )) ||
                (selectedKey === '2' && (
                    <FileAdminPanel
                        isAddModalOpen={isAddModalOpen}
                        setIsAddModalOpen={setIsAddModalOpen}
                        isEditModalOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                )) ||
                (selectedKey === '3' && <ArticleTable />) ||
                (selectedKey === '4' && (
                    <UserAdminPanel
                        isEditModalOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                ))}
        </div>
    )
}

export default AdminRouter
