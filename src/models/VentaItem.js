export default class VentaItem{
  constructor(productoNombre, productoCantidad, total){
    this._nombre = productoNombre;
    this._cantidad = productoCantidad;
    this._total = total;
  }

  get getNombre() { return this._nombre; }

  get getCantidad() { return this._cantidad; }

  get getTotal() { return this._total; }

  getFormattedObj(){
    return {
      "Nombre": this.getNombre,
      "Cantidad": this.getCantidad,
      "Total": this.getTotal
    }
  }

  show() {
    console.table(this.getFormattedObj());
  }
}