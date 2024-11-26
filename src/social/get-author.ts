import db from 'db';
import { Author } from "./author";

export default async function getAuthor(name: string): Promise<Author> {
    const document = await db.findOneBy<Author>(
        'select * from c where c.name = :name',
        [{ name: 'name', value: name }],
        'social',
    );
    if (!document) {
        throw new Error('Author not found');
    }
    return document;
}