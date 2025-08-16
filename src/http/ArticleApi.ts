import { ArticleType, CreateArticleType, UpdateArticleType } from '@/types/ArticleTypes'
import { BaseApi } from './BaseApi'

export class ArticleApi extends BaseApi<ArticleType, CreateArticleType, UpdateArticleType> {
    constructor() {
        super('/articles')
    }
}
