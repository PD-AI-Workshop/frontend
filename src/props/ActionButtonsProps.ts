export interface ActionButtonsProps<T> {
    record: T
    onEdit?: (record: T) => void
    onDelete?: (record: T) => Promise<void>
    editText?: string
    deleteText?: string
    confirmDeleteMessage?: string
}
