import CategoryAdminPage from './Category/CategoryAdminPage'
import FileAdminPanel from './File/FileAdminPanel'
import ArticleTable from './Article/ArticleTable'
import UserAdminPanel from './User/UserAdminPanel'
import { useAdminState } from '@/hooks/useAdminState'
import { JSX } from 'react'

const AdminRouter = ({ selectedKey }: { selectedKey: string }) => {
    const state = useAdminState()

    const components: Record<string, JSX.Element> = {
        '1': <CategoryAdminPage
            {...state}
            selectedItem={state.selectedCategory}
            setSelectedItem={state.setSelectedCategory}
        />,
        '2': <FileAdminPanel
            {...state}
            selectedItem={state.selectedFile}
            setSelectedItem={state.setSelectedFile}
        />,
        '3': <ArticleTable />,
        '4': <UserAdminPanel
            {...state}
            selectedItem={state.selectedUser}
            setSelectedItem={state.setSelectedUser}
        />
    }

    return <div>{components[selectedKey]}</div>
}

export default AdminRouter
