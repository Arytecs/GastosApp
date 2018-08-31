export class User {
  public name: string;
  public password: string;
  public email: string;
  public avatar: string;
  public gettoken: boolean;

  constructor(name: string, password: string, email: string, avatar: string, gettoken: boolean) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.avatar = avatar;
    this.gettoken = gettoken;
  }
}
