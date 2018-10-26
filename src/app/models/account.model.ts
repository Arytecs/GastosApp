import { User } from './user.model';

export class Account {
  public name: string;
  public creator: User;
  public image: string;
  public shared: User[];
  public created_at: string;

  constructor(name: string, creator: User, image: string, shared: User[], created_at: string) {
    this.name = name;
    this.shared = shared;
    this.creator = creator;
    this.image = image;
    this.created_at = created_at;
  }
}
