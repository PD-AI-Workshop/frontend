import { CategoryType } from "@/types/CategoryType";
import { BaseApi } from "./BaseApi";
import { CreateCategoryType } from "@/types/CreateCategoryType";
import { UpdateCategoryType } from "@/types/UpdateCategoryType";

export class CategoryApi extends BaseApi<CategoryType, CreateCategoryType, UpdateCategoryType> {
    constructor() {
        super('/categories')
    }
}