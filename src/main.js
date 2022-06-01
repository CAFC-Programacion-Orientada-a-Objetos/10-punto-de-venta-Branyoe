import PuntoDeVenta from './models/PuntoDeVenta.js';



const options = [
  "Agregar Producto",
  "Mostrar Productos",
  "Eliminar Producto",
  "Hacer una venta",
  "Mostrar ventas",
  "Salir"
]

const app = new PuntoDeVenta(options);

app.start();