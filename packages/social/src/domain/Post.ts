import { Uuid } from 'utils';

export interface PostProps {
    title: string,
    content: string,
    likes: number;
    dateCreated: Date,
}

export default class Post {
    private _id: Uuid;

    constructor(private readonly props: PostProps, id?: Uuid) {
        this._id = id || Uuid.create();
    }

    static create(props: PostProps, id?: Uuid): Post {
        return new this({
            ...props,
            likes: props.likes || 0,
        }, id);
    }

    get id(): Uuid {
        return this._id;
    }

    get likes(): number {
        return this.props.likes;
    }


    addLike() {
        this.props.likes += 1;
    }

    toJSON(): { id: string } & PostProps {
        return {
            id: this._id.get(),
            ...this.props,
        };
    }
}