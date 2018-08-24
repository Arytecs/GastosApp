export class Category {
  public name: string;
  public id: string;
  public idpadre: string;

  constructor(name: string, id: string, idpadre: string) {
    this.name = name;
    this.id = id;
    this.idpadre = idpadre;
  }
}
