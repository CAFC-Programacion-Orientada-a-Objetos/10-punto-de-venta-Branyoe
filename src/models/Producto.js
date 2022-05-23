export default class Producto{

  constructor(nombre = "", costo = 0){
    this._nombre = nombre;
    this._costo = costo;
  }

  get getNombre () { return this._nombre; };
  set setNombre(nuevoNombre) {
    this._nombre = nuevoNombre;
  }

  get getCosto () { return this._costo; }
  set setCosto(neuevoCosto) {
    this._costo = neuevoCosto;
  }

  getFormattedObj() {
    return {
      "Nombre": this.getNombre,
      "Costo": this.getCosto
    }
  }

  show() {
    console.table(this.getFormattedObj());
  }
}