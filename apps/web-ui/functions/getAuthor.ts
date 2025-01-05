import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { GetAuthor } from 'social';

export default async function getAuthorHandler (req: HttpRequest): Promise<HttpResponseInit> {
  const { name } = req.params;
  const author = await new GetAuthor().query(name);
  return {
    status: 200,
    jsonBody: author,
  };
}

app.http('getAuthor', {
  handler: getAuthorHandler,
  methods: ['GET'],
  route: 'authors/{name:alpha}',
  authLevel: 'function',
});
