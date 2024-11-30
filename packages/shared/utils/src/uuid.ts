import { v4 as uuid4 } from 'uuid';

export function create(): string {
    return uuid4();
}