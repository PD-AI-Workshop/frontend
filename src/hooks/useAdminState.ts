import { CategoryType } from "@/types/CategoryTypes"
import { FileType } from "@/types/FileType"
import { UserType } from "@/types/UserTypes"
import { useState } from "react"

export const useAdminState = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

    return {
        isAddModalOpen,
        setIsAddModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedCategory,
        setSelectedCategory,
        selectedFile,
        setSelectedFile,
        selectedUser,
        setSelectedUser
    }
}