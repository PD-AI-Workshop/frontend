import { FileApi } from '@/http/FileApi'
import { FileType } from '@/types/FileType'
import { makeAutoObservable, runInAction } from 'mobx'

export class FileStore {
    private files: FileType[] = []
    private readonly fileApi = new FileApi()

    constructor() {
        makeAutoObservable(this)
    }

    public setFiles(files: FileType[]): void {
        this.files = files
    }

    public getFiles(): FileType[] {
        return this.files
    }

    async fetch(): Promise<void> {
        try {
            const files = await this.fileApi.getAll()
            this.setFiles(files)
        } catch (error) {
            console.error('Ошибка загрузки файлов:', error)
        }
    }

    async getById(id: number): Promise<FileType> {
        const existing = this.files.find((a) => a.id === id)
        if (existing) return existing

        const file = await this.fileApi.getById(id)

        runInAction(() => {
            this.files.push(file)
        })

        return file
    }

    async create(file: FormData): Promise<FileType> {
        const newFile = await this.fileApi.create(file)
        this.files.push(newFile)
        return newFile
    }

    async update(id: number, file: FormData): Promise<void> {
        await this.fileApi.update(id, file)

        runInAction(() => {
            const index = this.files.findIndex((a) => a.id === id)
            if (index !== -1) {
                this.files[index] = {
                    ...this.files[index],
                    ...file,
                }
            }
        })
    }

    async delete(id: number): Promise<void> {
        await this.fileApi.delete(id)

        runInAction(() => {
            this.files = this.files.filter((a) => a.id !== id)
        })
    }

    async delete_all_unused(): Promise<void> {
        await this.fileApi.delete_all_unused()
    }
}
