import { createUuid } from "utils";
import { Author } from "./author";
import { db } from "db";

export async function register(name: string): Promise<Author> {
    const author: Author = {
        id: createUuid(),
        name,
        posts: [],
    }

    await db.save(author, 'social');
    return author;
}