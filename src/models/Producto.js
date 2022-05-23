export default class Producto{
  constructor(nombre = "", costo = 0){
    this.nombre = nombre;
    this.costo = costo;
  }



  
  
  show() {
    console.table(this);
  }
}