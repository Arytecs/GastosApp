export class User{
    public name:string;
    public pass:string;
    public email:string;
    public avatar:string;

    constructor(name:string, pass:string, email:string, avatar:string){
        this.name = name;
        this.pass = pass;
        this.email = email;
        this.avatar= "../src/assets/userAvatar.jpg";
    }
}