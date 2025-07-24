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