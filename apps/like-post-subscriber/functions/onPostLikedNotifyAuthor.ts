import { app } from '@azure/functions';

export default async function onPostLikedHandler(event: unknown): Promise<void> {
    console.log({ event } as Record<string, string|number|boolean>);
}

app.serviceBusQueue('onPostLiked', {
    queueName: 'post-likes',
    handler: onPostLikedHandler,
    connection: 'AZURE_SERVICE_BUS_CONNECTION_STRING',
});