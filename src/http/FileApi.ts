import { FileType } from "@/types/FileType";
import { BaseApi } from "./BaseApi";

export class FileApi extends BaseApi<FileType, FormData, FormData> {
    constructor() {
        super('/files')
    }
}