export interface Post {
    id: string,
    title: string,
    text: string,
    authorId: string,
    likes: number;
    dateCreated: Date,
}