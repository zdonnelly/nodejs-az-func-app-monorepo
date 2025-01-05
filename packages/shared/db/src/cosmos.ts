import { CosmosClient } from '@azure/cosmos';
import SqlParameter from './sqlParameter';

export async function save<T>(document: T, containerName: string): Promise<void> {
  const { DB_CONNECTION_STRING } = process.env;
  const client = new CosmosClient(DB_CONNECTION_STRING as string);
  await client.database('my-db').container(containerName).items.upsert(document);
}

export async function query<T>(containerName: string, params: SqlParameter[]): Promise<T[]> {
  const { DB_CONNECTION_STRING } = process.env;
  const client = new CosmosClient(DB_CONNECTION_STRING as string);
  let sql = 'select * from c';
  if (params.length) {
    sql += ` where ${params.map((p) => {
      if (typeof p.value === 'string') {
        return `lower(c.${p.name}) = @${p.name}`;
      }
      return `c.${p.name} = @${p.name}`;
    }).join(' and ')}`;
  }
  console.log(sql);
  console.log(params);
  const response = await client.database('my-db')
    .container(containerName)
    .items.query({
      query: sql, parameters: params.map((param) => {
        return {
          name: `@${param.name}`,
          value: param.value,
        };
      }),
    })
    .fetchAll();
  return response.resources;
}

export async function findOneBy<T>(sql: string, parameters: SqlParameter[], containerName: string): Promise<T | null> {
  const { DB_CONNECTION_STRING } = process.env;
  const client = new CosmosClient(DB_CONNECTION_STRING as string);
  const response = await client.database('my-db').container(containerName).items.query({
    query: sql,
    parameters
  }).fetchNext();
  return response.resources.length ? response.resources[0] : null;
}