import AuthorRepositoryCosmos, { AuthorDocument } from '../infra/AuthorRepositoryCosmos';
import { ByName } from '../infra/AuthorQueries';

export default class GetAuthor {
    async query(name: string): Promise<AuthorDocument> {
        const repository = new AuthorRepositoryCosmos();
        const query = new ByName(name);
        const [author] = await repository.query(query);
        if (!author) {
            throw new Error('Author not found');
        }
        return author;
    }
}
