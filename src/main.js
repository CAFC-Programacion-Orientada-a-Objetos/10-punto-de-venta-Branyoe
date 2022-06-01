import fs from 'fs';
import Keyboard from './models/Keyboard.js';
import Menu from './models/Menu.js';
import Product from './models/Product.js';
import PuntoDeVenta from './models/PuntoDeVenta.js';
import VentaItem from './models/SaleItem.js';


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