import { ArticleType } from "@/types/ArticleType";
import { BaseApi } from "./BaseApi";
import { CreateArticleType } from "@/types/CreateArticleType";
import { UpdateArticleType } from "@/types/UpdateArticleType";

export class ArticleApi extends BaseApi<ArticleType, CreateArticleType, UpdateArticleType> {
    constructor() {
        super("/articles")
    }
}