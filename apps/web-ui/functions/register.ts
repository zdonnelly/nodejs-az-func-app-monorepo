import { app, HttpResponseInit, HttpRequest } from "@azure/functions";
import { register } from "social";


export default async function registerHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const body = await req.json() as { name: string };
    const { id } = await register(body.name);
    return {
        status: 201,
        body: id,
    }
}

app.http('register', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: registerHandler,
})