import fs from 'fs';
import Keyboard from './keyboard.js';
import Menu from './models/Menu.js';
import Producto from './models/Producto.js';
import VentaItem from './models/VentaItem.js';

const jsonDB = JSON.parse(fs.readFileSync("src/data.json"));

class PuntoDeVenta {
  constructor(jsonDB) {
    this.data = jsonDB.data;
    this.options = jsonDB.options;
    this.venta = [];
    this.count = 0;
  }

  //metodos*********************
  start() {
    let option = 1;
    do {
      console.clear();

      const menu = new Menu(this.options);
      option = menu.show()
    } while (!(option >= 1 && option <= 6));
    this._navigator(this.options[option - 1]);
  }

  _navigator(opc) {
    console.clear();

    this.startDecoration(opc.name);

    switch (opc.id) {
      case 1:
        this.AgregarProducto();
        break;
      case 2:
        this.MostarProductos();
        Keyboard.readString("\npresione enter para continuar");
        break;
      case 3:
        this.EliminarProducto();
        break;
      case 4:
        this.HacerVenta();
        break;
      case 5:
        this.MostarVentas();
        break;
      case 6:
        this.Salir();
        return

      default:
        console.log("opcion ivalida");
        break;
    }
    this.start();
  }

  Salir() {
    const dataModificada = {
      options: this.options,
      data: this.data
    }
    fs.writeFileSync("src/data.json", JSON.stringify(dataModificada, null, 2))
  }

  //metodos de productos
  AgregarProducto() {
    let productoNombre = Keyboard.readString("-->Introduce el nombre del producto: ");
    let productoCosto = Keyboard.readNumber("-->Introduce el costo del producto: ");

    const newProducto = new Producto(productoNombre, productoCosto);

    this.data.productos.push(newProducto);
    console.clear()
    console.log("\n¡Producto agregado!\n");
    newProducto.show();
    Keyboard.readString("\npresione enter para continuar");
  }

  MostarProductos() {
    if (this.data.productos.length === 0) {
      console.info("¡Aún no has agregado productos!");
    } else {
      this.data.productos.map((v, i) => {
        console.log(`${i}.-`);
        console.table(v);
      })
    }

  }

  EliminarProducto() {
    if (this.data.productos.length === 0) {
      this.MostarProductos();
    } else {
      this.MostarProductos();
      let productoIndex = Keyboard.readNumber('\n-->Introduce el "index" del producto a eliminar: ');
      console.clear();
      console.log("\n¡Producto Eliminado!\n");
      this.data.productos[productoIndex].show();
      this.data.productos.splice(productoIndex, 1);
    }
    Keyboard.readString("\npresione enter para continuar");
  }

  //metodos de ventas
  HacerVenta() {
    if (this.data.productos.length === 0) {
      this.MostarProductos();
      Keyboard.readString("\npresione enter para continuar");
    } else {
      this.MostarProductos();
      let productoIndex = Keyboard.readNumber('\n-->Introduce el "index" del producto para agregarlo al carrito: ');
      let productoCantidad = Keyboard.readNumber('-->Introduce el numero de unidades del producto: ');

      const productoDetalle = new VentaItem(
        this.data.productos[productoIndex].getNombre,
        productoCantidad,
        this.data.productos[productoIndex].getCosto * productoCantidad
      );
      this.venta.push(productoDetalle);
      console.clear();
      console.log("\n¡Producto Agregado a la venta!\n");
      console.table(productoDetalle);
      let exit = Keyboard.readString("\n-->Desea agregar otro producto? (S/N): ").toLowerCase()
      if (exit === "s") {
        this._navigator(this.options[3])
      } else {
        let suma = 0;
        this.venta.forEach((v, i) => {suma += v.getTotal});
        this.venta.push({
          "total global": suma
        })
        this.data.ventas.push(this.venta);
        console.clear();
        console.log("¡Venta realizada!\n");
        console.table(this.venta);
        Keyboard.readString("\npresione enter para continuar");
        this.venta = [];
      }
    }
    
  }

  MostarVentas() {

    if (this.data.ventas.length === 0) {
      console.info("¡Aún no has realizado ventas!");
      Keyboard.readString("\npresione enter para continuar");
    } else {
      console.table(this.data.ventas[this.count]);
      this.count += 1;
      let exit = Keyboard.readString("\n-->Desea ver la sigiente? (S/N): ").toLowerCase();
      if(exit === "s"){
        this._navigator(this.options[4]);
      }
      this.count = 0;
    }

  }

  //utilidades
  startDecoration = (text = "") => console.log(`\n******${text}******\n`);
  endDecoration = () => console.log("\n********************************\n");
}

const app = new PuntoDeVenta(jsonDB);
app.start();