export type BaseAddModalPropsType = {
    isAddModalOpen: boolean
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type BaseEditModalPropsType<T> = {
    isEditModalOpen: boolean
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedItem: T | null
}

export type BaseSetSelectedItemPropsType<T> = {
    setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>
}

export type BaseTablePropsType<T> = Partial<Pick<BaseAddModalPropsType, 'setIsAddModalOpen'>> & BaseSetSelectedItemPropsType<T> & Pick<BaseEditModalPropsType<T>, 'setIsEditModalOpen'>

export type BaseAdminPanelPropsType<T> = BaseAddModalPropsType & BaseEditModalPropsType<T> & BaseSetSelectedItemPropsType<T>
