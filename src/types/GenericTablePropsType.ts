import { ColumnType } from 'antd/es/table'

export type GenericTablePropsType<T> = {
    dataSource: T[]
    columns: ColumnType<T>[]
    onAdd?: () => void
    addButtonText?: string
    rowKey?: string
}
