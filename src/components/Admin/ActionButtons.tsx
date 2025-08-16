import { ActionButtonsProps } from '@/props/ActionButtonsProps'
import { Button, Space } from 'antd'
import { ReactElement } from 'react'

const ActionButtons = <T extends { id: number }>({
    record,
    onEdit,
    onDelete,
    editText = 'Изменить',
    deleteText = 'Удалить',
    confirmDeleteMessage,
}: ActionButtonsProps<T>): ReactElement => {
    const handleEditClick = () => {
        onEdit?.(record)
    }

    const handleDelete = async () => {
        if (!onDelete) return

        if (confirmDeleteMessage && !window.confirm(confirmDeleteMessage)) {
            return
        }

        try {
            await onDelete(record)
        } catch (error) {
            console.error('Ошибка при удалении:', error)
        }
    }

    return (
        <Space>
            {onEdit && (
                <Button type="primary" onClick={handleEditClick}>
                    {editText}
                </Button>
            )}

            {onDelete && (
                <Button danger onClick={handleDelete}>
                    {deleteText}
                </Button>
            )}
        </Space>
    )
}

export default ActionButtons
