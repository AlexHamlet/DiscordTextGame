export interface StoryFile {
    [key: string]: Page
}

export interface Page {
    id: string,
    Text: string,
    Options: StoryPath[]
}

export interface StoryPath {
    Selector: string,
    Text: string,
    Path: string
}
