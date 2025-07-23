export type BlobInfoType = {
    blob: () => Blob;
    filename: () => string;
    id: () => string;
    name: () => string;
    uri: () => string | undefined;
}