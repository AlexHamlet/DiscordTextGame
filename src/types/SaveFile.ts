export interface SaveFile {
    [key: string]: StorySaveInfo
}

export interface StorySaveInfo {
    pageId: string;
    latest: boolean;
}

