import Product from "./Product.js";

export default class SaleItem{
  constructor(product = new Product("...", 0), amount){
    this._productName = product.getName;
    this._productPrice = product.getPrice;
    this._amount = amount;
    this._total = product.getPrice * amount;
  }

  get getTotal() {return this._total};

  show(){
    console.table({
      "Nombre del producto": this._productName,
      "Precio unitario": this._productPrice,
      "Unidades": this._amount,
      "Total de fila": this._total
    })
  }
}