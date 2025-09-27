import { ArticleApi } from '@/http/ArticleApi'
import { ArticleType, CreateArticleType, UpdateArticleType } from '@/types/ArticleTypes'
import { CategoryType } from '@/types/CategoryTypes'
import { makeAutoObservable, runInAction } from 'mobx'

export class ArticleStore {
    private articles: ArticleType[] = []
    currentArticle: ArticleType | null = null
    private readonly articleApi = new ArticleApi()

    constructor() {
        makeAutoObservable(this)
    }

    public setArticles(articles: ArticleType[]): void {
        this.articles = articles
    }

    public setCurrentArticle(article: ArticleType | null): void {
        this.currentArticle = article
    }

    public getArticles(): ArticleType[] {
        return this.articles
    }

    async fetch(): Promise<void> {
        try {
            const articles = await this.articleApi.getAll()
            this.setArticles(articles)
        } catch (error) {
            console.error('Ошибка загрузки статей:', error)
        }
    }

    async getById(id: number): Promise<void> {
        const article = await this.articleApi.getById(id)
        this.setCurrentArticle(article)
    }

    async create(article: CreateArticleType): Promise<void> {
        const newArticle = await this.articleApi.create(article)
        this.articles.push(newArticle)
    }

    async update(id: number, article: UpdateArticleType): Promise<void> {
        await this.articleApi.update(id, article)

        runInAction(() => {
            const index = this.articles.findIndex((a) => a.id === id)
            if (index !== -1) {
                this.articles[index] = {
                    ...this.articles[index],
                    ...article,
                }
            }
        })
    }

    async delete(id: number): Promise<void> {
        await this.articleApi.delete(id)

        runInAction(() => {
            this.articles = this.articles.filter((a) => a.id !== id)
        })
    }

    get onTrendArticles(): ArticleType[] {
        return this.articles.toSorted(() => Math.random() - 0.5).slice(0, 3)
    }

    public getNeuralNetworkArticles(categories: CategoryType[]): ArticleType[] {
        return this.articles
            .map((article) => ({
                ...article,
                category_names: article.category_ids.map((id) => categories.find((cat) => cat.id === id)?.name),
            }))
            .filter((article) => article.category_names.includes('Нейросети'))
            .map((article) => {
                const { category_names, ...rest } = article
                return rest
            })
            .slice(0, 3)
    }

    get lastArticles(): ArticleType[] {
        return this.articles
            .toSorted((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime())
            .slice(0, 2)
    }
}
