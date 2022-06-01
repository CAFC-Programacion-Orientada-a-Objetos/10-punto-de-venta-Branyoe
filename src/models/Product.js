export default class Product{

  constructor(name = "", price = 0){
    this._name = name;
    this._price = price;
  }

  get getName() {return this._name;}
  get getPrice() {return this._price;}

  show(){
    console.table({
      "Nombre del producto": this._name,
      "Precio del producto": this._price
    });
  }
}