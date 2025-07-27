import { Context } from "@/app/StoresProvider"
import { FileType } from "@/types/FileType"
import { StoresType } from "@/types/StoresType"
import { Dispatch, SetStateAction, useContext } from "react"
import ActionButtons from "../ActionButtons"
import GenericTable from "../GenericTable"
import { observer } from "mobx-react-lite"

export interface FileTableProps {
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
    setSelectedFile: Dispatch<SetStateAction<FileType | null>>
}

const FileTable = ({ setIsAddModalOpen, setIsEditModalOpen, setSelectedFile }: FileTableProps) => {
    const { fileStore } = useContext(Context) as StoresType
    const files = fileStore.getFiles()
    const onEdit = (file: FileType) => {
        setSelectedFile(file)
        setIsEditModalOpen(true)
    }
    const onDelete = async (file: FileType) => {
        await fileStore.delete(file.id)
        await fileStore.fetch()
    }
    const onAdd = () => setIsAddModalOpen(true)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название', dataIndex: 'name', key: 'name' },
        { title: 'Размер', dataIndex: 'size', key: 'size' },
        { title: 'Ссылка на изображение', dataIndex: 'url', key: 'url' },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: any, record: FileType) => (
                <ActionButtons<FileType>
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    confirmDeleteMessage="Вы уверены, что хотите удалить файл?"
                />
            ),
        },
    ]

    return (
        <GenericTable
            dataSource={files}
            columns={columns}
            onAdd={onAdd}
        /> 
    )
}

export default observer(FileTable)