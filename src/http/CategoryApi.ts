import { CategoryType, CreateCategoryType, UpdateCategoryType } from '@/types/CategoryTypes'
import { BaseApi } from './BaseApi'

export class CategoryApi extends BaseApi<CategoryType, CreateCategoryType, UpdateCategoryType> {
    constructor() {
        super('/categories')
    }
}
