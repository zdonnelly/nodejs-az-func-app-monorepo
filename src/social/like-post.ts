import { db } from "db";
import { Author } from "./author";
import { Post } from "./post";

export default async function likePost(authorId: string, postId: string): Promise<void> {
    const author = await db.findOneBy<Author>(
        'select * from c where c.id = :id',
        [{ name: 'id', value: authorId }],
        'social',
    );
    if (!author) {
        throw new Error('Author not found');
    }
    const postIndex = author.posts.findIndex((p: Post) => p.id === postId);
    if (postIndex < 0) {
        throw new Error('Post not found');
    }
    author.posts[postIndex].likes += 1;
    await db.save<Author>(author, 'social');
}