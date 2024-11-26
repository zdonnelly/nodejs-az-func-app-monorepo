import { createUuid } from "../shared/utils/uuid";
import db from 'db';
import { Post } from "./post";

export async function createPost(title: string, text: string, authorId: string): Promise<string> {
    const id = createUuid();
    const post: Post = {
        id,
        title,
        text,
        authorId,
        likes: 0,
        dateCreated: new Date(Date.now()),
    };
    await db.save<Post>(post, 'social');
    return id;
}