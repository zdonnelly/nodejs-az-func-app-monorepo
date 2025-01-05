import { Uuid } from 'utils';
import AuthorRepositoryCosmos from '../infra/AuthorRepositoryCosmos';
import Author from '../domain/Author';

export default class Register {
    async execute(name: string): Promise<Uuid> {
        const repository = new AuthorRepositoryCosmos();
        const author = new Author({
            name,
            posts: [],
        });
        await repository.save(author);
        return author.id;
    }
}
