import { createUuid } from 'utils';
import db from 'db';
import { Post } from "./post";
import { Author } from "./author";

export async function createPost(title: string, content: string, authorId: string): Promise<string|void> {
    const id = createUuid();
    const post: Post = {
        id,
        title,
        content,
        authorId,
        likes: 0,
        dateCreated: new Date(Date.now()),
    };
    const author = await db.findOneBy<Author>('select * from c where c.id = @id', [{ name: '@id', value: authorId }], 'social');
    if (author) {
        console.log('author found');
        author.posts.push(post);
        await db.save(author, 'social');
        console.log('author saved');
        return id;
    } else {
        console.log('author not found');
    }
}