export type CategoryType = {
    id: number
    name: string
}

export type CreateCategoryType = Omit<CategoryType, 'id'>

export type UpdateCategoryType = CategoryType
