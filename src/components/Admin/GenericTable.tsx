import { Button } from 'antd'
import Table, { ColumnType } from 'antd/es/table'
import BackButton from './BackButton'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

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
    const screens = useBreakpoint()
    const isMobile = !screens.md

    return (
        <div>
            <div className="flex md:justify-start justify-center items-center gap-3 mb-4 flex-wrap">
                {onAdd && (
                    <Button
                        onClick={onAdd}
                        type="primary"
                    >
                        {addButtonText}
                    </Button>
                )}
                <BackButton />
            </div>

            <div className="w-full overflow-x-auto">
                <Table
                    bordered
                    className="min-w-full"
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={rowKey}
                    scroll={{ x: 'max-content' }}
                    size={isMobile ? 'small' : 'middle'}
                />
            </div>
        </div>
    )
}

export default GenericTable