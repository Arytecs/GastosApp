import { User } from './user.model';
import { Movement } from './movement.model';

export class Account {

  constructor(
    public name: string,
    public img: string,
    public creator: string,
    public shared: User[],
    public created_at: string,
    ) {}
}
