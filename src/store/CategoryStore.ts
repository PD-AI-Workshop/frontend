import { CategoryApi } from "@/http/CategoryApi";
import { CategoryType } from "@/types/CategoryType";
import { CreateCategoryType } from "@/types/CreateCategoryType";
import { UpdateCategoryType } from "@/types/UpdateCategoryType";
import { makeAutoObservable, runInAction } from "mobx";

export class CategoryStore {
    private categories: CategoryType[] = []
    private readonly categoryApi = new CategoryApi()

    constructor() {
        makeAutoObservable(this)
    }

    public setCategories(categories: CategoryType[]): void {
        this.categories = categories
    }

    public getCategories(): CategoryType[] {
        return this.categories
    }

    async fetch(): Promise<void> {
        try {
            const categories = await this.categoryApi.getAll()
            this.setCategories(categories)
        } catch(error) {
            console.error("Ошибка загрузки статей:", error)
        }
    }

    async getById(id: number): Promise<CategoryType> {
        const existing = this.categories.find(a => a.id === id)
        if (existing) return existing
        
        const category = await this.categoryApi.getById(id)

        runInAction(() => {
            this.categories.push(category)
        })

        return category
    }

    async create(category: CreateCategoryType): Promise<void> {
        const newCategory = await this.categoryApi.create(category)
        this.categories.push(newCategory)
    }

    async update(id: number, category: UpdateCategoryType): Promise<void> {
        await this.categoryApi.update(id, category)

        runInAction(() => {
            const index = this.categories.findIndex(a => a.id === id)
            if (index !== -1) {
                this.categories[index] = {
                    ...this.categories[index],
                    ...category
                }
            }
        })
    }

    async delete(id: number): Promise<void> {
        await this.categoryApi.delete(id)

        runInAction(() => {
            this.categories = this.categories.filter(a => a.id !== id)
        })
    }
}