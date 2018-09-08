export class User {
  public _id: string;
  public name: string;
  public password: string;
  public email: string;
  public avatar: string;
  public isToken: boolean;

  constructor(_name: string, password: string, email: string, avatar: string, isToken: boolean) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.avatar = avatar;
    this.isToken = isToken;
  }
}
