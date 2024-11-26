import { v4 as uuid4 } from 'uuid';

export function createUuid(): string {
    return uuid4();
}