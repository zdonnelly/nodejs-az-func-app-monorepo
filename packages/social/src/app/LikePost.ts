import db from 'db';
import Author from '../domain/Author';
import { publishEvent } from 'event-bus';
import AuthorRepositoryCosmos from '../infra/AuthorRepositoryCosmos';
import { Uuid } from 'utils';

export default class LikePost {
    async execute(authorId: string, postId: string): Promise<void> {
        const repository = new AuthorRepositoryCosmos();
        const author = await repository.findById(authorId);
        if (!author) {
            throw new Error('Author not found');
        }
        author.likePost(Uuid.fromString(postId));
        await db.save<Author>(author, 'social');
        for (let event of author.events) {
            await publishEvent(event, event.name as string);
        }
    }
}
