import { Uuid } from 'utils';
import { publishEvent } from 'event-bus';
import Post from '../domain/Post';
import AuthorRepositoryCosmos from '../infra/AuthorRepositoryCosmos';

export default class CreatePost {
    async execute(title: string, content: string, authorId: string): Promise<Uuid|void> {
        const id = Uuid.create();
        const post = new Post({
            title,
            content,
            likes: 0,
            dateCreated: new Date(Date.now()),
        });
        const repository = new AuthorRepositoryCosmos();
        const author = await repository.findById(authorId);
        if (author) {
            console.log('author found');
            author.createPost(post);
            await repository.save(author);
            for(let event of author.events) {
                await publishEvent(event, event.name as string);
            }
            console.log('author saved');
            return id;
        } else {
            console.log('author not found');
        }
    }
}
