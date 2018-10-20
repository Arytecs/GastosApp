import { User } from './user.model';

export class Account {

  constructor(
    public _id: string,
    public name: string,
    public img: string,
    public creator: string,
    public shared: User[],
    public created_at: string,
    ) {}
}
