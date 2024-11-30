export interface Post {
    id: string,
    title: string,
    content: string,
    authorId: string,
    likes: number;
    dateCreated: Date,
}