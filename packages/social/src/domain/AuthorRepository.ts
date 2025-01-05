import Author from './Author';

interface AuthorRepository {
  findById(id: string): Promise<Author|null>;
  save(author: Author): Promise<void>;
  remove(author: Author): Promise<void>;
}

export default AuthorRepository;
