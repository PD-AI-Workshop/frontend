import { Button } from 'antd'
import Table, { ColumnType } from 'antd/es/table'
import styles from './../../styles/GenericTable.module.css'
import BackButton from './BackButton'

export interface GenericTableProps<T> {
    dataSource: T[]
    columns: ColumnType<T>[]
    onAdd?: () => void
    addButtonText?: string
    rowKey?: string
}

const GenericTable = <T extends object>({
    dataSource,
    columns,
    onAdd,
    addButtonText = 'Добавить',
    rowKey = 'id',
}: GenericTableProps<T>) => {
    return (
        <div>
            {onAdd &&
                <Button className={styles.addButton} onClick={onAdd} type="primary">
                    {addButtonText}
                </Button>
            }

            <BackButton />

            <Table
                bordered
                className={styles.table}
                dataSource={dataSource}
                columns={columns}
                rowKey={rowKey}
            />
        </div>
    )
}

export default GenericTable