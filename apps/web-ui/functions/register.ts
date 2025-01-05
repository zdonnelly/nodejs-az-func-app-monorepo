import { app, HttpResponseInit, HttpRequest } from '@azure/functions';
import { Register } from 'social';

export default async function registerHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const body = await req.json() as { name: string };
    const id = await new Register().execute(body.name);
    return {
        status: 201,
        body: id.toString(),
    };
}

app.http('register', {
    methods: ['POST'],
    authLevel: 'function',
    handler: registerHandler,
});