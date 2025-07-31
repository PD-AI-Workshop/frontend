import GenericTable from '../GenericTable'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks/useStores'

const ArticleTable = () => {
    const { articleStore } = useStores()
    const articles = articleStore.getArticles()
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название', dataIndex: 'title', key: 'title' },
        { title: 'Дата создания', dataIndex: 'created_date', key: 'created_date' },
        { title: 'Ссылка на главное фото', dataIndex: 'main_image_url', key: 'main_image_url' },
        { title: 'ID контента', dataIndex: 'text_id', key: 'text_id' },
        { title: 'ID пользователя', dataIndex: 'user_id', key: 'user_id' },
        { title: 'ID категорий', dataIndex: 'category_ids', key: 'category_ids' },
        { title: 'ID изображений', dataIndex: 'image_ids', key: 'image_ids' },
    ]

    return <GenericTable dataSource={articles} columns={columns} />
}

export default observer(ArticleTable)
