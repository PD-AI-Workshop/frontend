import { ColumnType } from 'antd/es/table'

export interface GenericTableProps<T> {
    dataSource: T[]
    columns: ColumnType<T>[]
    onAdd?: () => void
    addButtonText?: string
    rowKey?: string
}
