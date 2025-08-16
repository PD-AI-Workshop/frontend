import { FileType } from '@/types/FileType'
import { BaseApi } from './BaseApi'
import $host from '.'

export class FileApi extends BaseApi<FileType, FormData, FormData> {
    constructor() {
        super('/files')
    }

    async delete_all_unused(): Promise<void> {
        await $host.delete<void>('/files/all-unused')
    }
}
