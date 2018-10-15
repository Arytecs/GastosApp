import { User } from './user.model';
import { Movement } from './movement.model';

export class Account {

  constructor(
    public name: string,
    public shared: User[],
    public img: string,
    public total: number,
    public movements: Movement[],
    ) {}
}
