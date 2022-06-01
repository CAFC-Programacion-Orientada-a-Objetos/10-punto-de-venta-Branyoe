export default class Sale{
  constructor(saleItems = []){
    this._saleItems = saleItems;
  }

  calcTotalSale(){
    let total = 0; 
    this._saleItems.forEach((saleItem, index) => {
      total += saleItem.getTotal;
    });

    return total;
  }

  show(){
    this._saleItems.forEach((saleItem, index) => {
      console.log(`Fila ${index + 1}: `);
      saleItem.show();
    })
    console.table({
      Total: this.calcTotalSale()
    })
  }
}