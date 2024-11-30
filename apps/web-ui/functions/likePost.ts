import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { likePost } from 'social';

export interface LikePostRequestBody {
    authorId: string,
    postId: string,
}
export default async function likePostHandler(req: HttpRequest): Promise<HttpResponseInit> {
    const { authorId, postId } = await req.json() as LikePostRequestBody;
    await likePost(authorId, postId);
    return {
        status: 200,
        body: 'OK'
    }
}

app.http('likePost', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: likePostHandler,
})