import { ServiceBusClient } from '@azure/service-bus';

type EventRecord = Record<string, string | number | boolean | Record<string, string|number|boolean>>;

export async function publishEvent(event: EventRecord, queueOrTopicName: string): Promise<void> {
    const bus = new ServiceBusClient(process.env.AZURE_SERVICE_BUS_CONNECTION_STRING!);
    const sender = bus.createSender(queueOrTopicName);
    await sender.sendMessages({ body: event });
}