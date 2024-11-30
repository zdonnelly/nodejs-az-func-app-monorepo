import {CosmosClient, SqlParameter} from "@azure/cosmos";

export async function save<T>(document: T, containerName: string): Promise<void> {
    const { DB_CONNECTION_STRING } = process.env;
    const client = new CosmosClient(DB_CONNECTION_STRING as string);
    await client.database('my-db').container(containerName).items.upsert(document);
}

export async function findOneBy<T>(sql: string, parameters: SqlParameter[], containerName: string): Promise<T|null> {
    const { DB_CONNECTION_STRING } = process.env;
    const client = new CosmosClient(DB_CONNECTION_STRING as string);
    const response = await client.database('my-db').container(containerName).items.query({ query: sql, parameters }).fetchNext();
    return response.resources.length ? response.resources[0] : null;
}