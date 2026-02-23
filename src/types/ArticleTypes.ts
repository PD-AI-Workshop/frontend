export type ArticleType = {
    id: number
    title: string
    created_date: string
    time_reading: number
    main_image_url: string
    text_id: number
    user_id: number
    username: string | null
    category_ids: number[]
    image_ids: number[]
}

export type CreateArticleType = Omit<ArticleType, 'id' | 'created_date' | 'user_id' | 'username'>

export type ArticleDataType = Omit<CreateArticleType, 'text_id'>

export type UpdateArticleType = CreateArticleType

export type ArticleAuthorInfoPropsType = Pick<ArticleType, 'time_reading' | 'username' | 'created_date'>
