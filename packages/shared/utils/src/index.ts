import { validate, v4 as uuid4 } from 'uuid';

export class InvalidUuid extends Error {
    constructor(value: string) {
        super(`The value ${value} is not a valid uuid`);
    }
}

export class Uuid {

    constructor(private readonly value: string) {
        const isValid = validate(value);
        if (!isValid) {
            throw new InvalidUuid(value);
        }
    }

    static create(): Uuid {
        return new Uuid(uuid4());
    }

    static fromString(value: string) {
        return new Uuid(value);
    }

    public get() {
        return this.value;
    }

    toString() : string {
        return this.get();
    }
}
