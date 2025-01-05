import db from 'db';
import Author, { AuthorProps } from '../domain/Author';
import AuthorRepository from '../domain/AuthorRepository';
import { AuthorQuery } from './AuthorQueries';
import { Uuid } from 'utils';
import { Resource } from '@azure/cosmos';

export interface AuthorDocument extends AuthorProps {
  id: string,
}

class Mapper {
  static toDocument(author: Author): AuthorDocument {
    return author.toJSON();
  }

  static toDomain(document: AuthorDocument): Author {
    return new Author({
      name: document.name,
      posts: document.posts
    }, Uuid.fromString(document.id));
  }
}

export default class AuthorRepositoryCosmos implements AuthorRepository {
  async findById(id: string): Promise<Author | null> {
    const result = await db.findOneBy<AuthorDocument>(
      'select * from c where id = @id',
      [{ name: '@id', value: id }],
      'social',
    );
    if (result) {
      return Mapper.toDomain(result);
    }
    return null;
  }

  async query(query: AuthorQuery): Promise<AuthorDocument[]> {
    const docs = await db.query<Partial<Resource & { _attachments: string }> & AuthorDocument>('social', query.params());
    docs.forEach((doc) => {
      delete doc._etag;
      delete doc._ts;
      delete doc._self;
      delete doc._rid;
      delete doc._attachments;
    });
    return docs;
  }

  async save(author: Author): Promise<void> {
    await db.save<AuthorDocument>(Mapper.toDocument(author), 'social');
  }

  remove(author: Author): Promise<void> {
    throw new Error('Method not implemented.');
  }
}