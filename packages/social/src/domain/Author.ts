import { Uuid } from 'utils';
import Post from './Post';

export interface AuthorProps {
    name: string,
    posts: Post[],
}

export default class Author {
    private _id: Uuid;
    private _events: Record<string, string | number | boolean | Record<string, string|number|boolean>>[];

    constructor(private readonly props: AuthorProps, id?: Uuid) {
        this._id = id || Uuid.create();
        this._events = [];
    }

    get id(): Uuid {
        return this._id;
    }

    get events(): Record<string, string|number|boolean|Record<string,any>>[] {
        return this._events;
    }

    createPost(post: Post): void {
        this.props.posts.push(post);
        const json = post.toJSON();
        this._events.push({
            name: 'PostCreated',
            authorId: this.id.get(),
            title: json.title,
            content: json.content,
            likes: 0,
            dateCreated: json.dateCreated.toString(),
        });
    }

    likePost(postId: Uuid): void {
        const post = this.props.posts.find((p: Post) => p.id.get() === postId.get());
        if (post ) {
            post.addLike();
            const { id, likes } = post.toJSON();
            this._events.push({
                id: this.id.get(),
                name: 'LikedPost',
                postId: id,
                likes,
            });
        }
    }

    toJSON(): { id: string } & AuthorProps {
        return {
            id: this._id.get(),
            name: this.props.name,
            posts: this.props.posts,
        };
    }
}