export default class VentaItem{
  constructor(productoNombre, productoCantidad, total){
    this.nombre = productoNombre;
    this.cantidad = productoCantidad;
    this.total = total;
  }


  

  show() {
    console.table(this);
  }
}