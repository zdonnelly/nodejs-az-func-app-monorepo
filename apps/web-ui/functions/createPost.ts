import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { createPost } from "social";

type CreatePostRequestBody = {
    title: string,
    content: string,
    authorId: string,
}

export default async function createPostHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const { title, content, authorId } = await req.json() as CreatePostRequestBody;
    const postId = await createPost(title, content, authorId);
    return {
        status: 201,
        jsonBody: {
            id: postId,
        },
    };
}

app.http('createPost', {
    methods: ['POST'],
    authLevel: 'function',
    handler: createPostHandler,
})