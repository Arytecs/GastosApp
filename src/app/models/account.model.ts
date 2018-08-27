import { User } from './user.model';

export class Account {
  public name: string;
  public shared: User[];

  constructor(name: string, shared: string) {
    this.name = name;
    this.shared = [];
  }
}
