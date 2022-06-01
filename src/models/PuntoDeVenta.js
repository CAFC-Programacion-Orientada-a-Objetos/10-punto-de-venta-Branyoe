import Utils from "../utils.js";
import Keyboard from "./Keyboard.js";
import Menu from "./Menu.js";
import Product from "./Product.js";
import Sale from "./Sale.js";
import SaleItem from "./SaleItem.js";

export default class PuntoDeVenta {

  //constructor
  constructor(options = ["empty"]) {
    this._menu = new Menu(options);
    this._options = options;
    this._products = [ new Product("Prueba", 11)];
    this._saleItems = [];
    this._sales = [];
    this._count = 0;
  }

  //metodos
  start() {
    let option = 1;
    console.clear();
    option = this._menu.show()
    if (!Utils.validateOptionFromMenu(option)) this._navigateTo(-1);
    if (option === 6) this._exit();
    this._navigateTo(option);
  }

  _navigateTo(option) {
    console.clear();
    Utils.showHeader(this._options[option - 1]);
    switch (option) {
      case 1:
        this._addProduct();
        break;
      case 2:
        this._showProducts();
        break;
      case 3:
        this._deleteProduct();
        break;
      case 4:
        this._makeSale();
        break;
      case 5:
        this._showSales();
        break;
      default:
        this._defaultAction();
        break;
    }
    Utils.pause("continuar");
    this.start();
  }

  _addProduct() {
    let productName, productPrice

    do {
      productName = Keyboard.readString("  =>Introduce el nombre del producto: ");
      productPrice = Keyboard.readString("  =>Introduce el precio del producto: ");
      console.log("");
    } while (!Utils.validateInputInAddProduct(productName, productPrice));

    let newProduct = new Product(productName, parseFloat(productPrice));
    this._products.push(newProduct);
    console.clear();
    Utils.showHeader("Producto Agregado");
    newProduct.show();
  }

  _showProducts() {
    if (this._products.length === 0) {
      console.log("Aún no existen productos!");
    } else {
      this._products.forEach((product, index) => {
        console.log(`Numero ${index + 1}.-`);
        product.show();
      })
    }
  }

  _deleteProduct() {
    if (this._products.length === 0) {
      this._showProducts();
      return;
    }
    this._showProducts();
    let selectedProduct = Keyboard.readString("\n  =>Introduce el numero del producto a eliminar o 0 para cancelar: ");

    if (!Utils.numberValidator(selectedProduct)) this._navigateTo(3);
    if (!Utils.validateRange(0, this._products.length, selectedProduct)) this._navigateTo(3);
    if (parseFloat(selectedProduct) === 0) this.start();
    console.clear();
    Utils.showHeader("Producto Eliminado")
    this._products[selectedProduct - 1].show();
    this._products.splice(selectedProduct - 1, 1);
  }

  _makeSale() {
    if (this._products.length === 0) {
      this._showProducts();
      return;
    } else {
      this._showProducts();
      let selectedProduct = Keyboard.readString("\n  =>Introduce el numero del producto para agregarlo a la venta o 0 para cancelar la venta: ");
      if (!Utils.numberValidator(selectedProduct)) this._navigateTo(4);
      if (!Utils.validateRange(0, this._products.length, selectedProduct)) this._navigateTo(4);
      if(parseFloat(selectedProduct) === 0){
        console.clear();
        Utils.showHeader("Venta cancelada");
        this._saleItems = [];
        return;
      }

      let productAmount = Keyboard.readString("  =>Intoduce la cantidad de productos que necesitas o 0 para cancelar la venta: "); 
      if(!Utils.numberValidator(productAmount)) this._navigateTo(4);
      if(parseFloat(productAmount) < 0) this._navigateTo(4);
      if(parseFloat(productAmount) === 0){
        console.clear();
        Utils.showHeader("Venta cancelada");
        this._saleItems = [];
        return;
      }

      console.clear();

      let selectedProductObj = this._products[selectedProduct - 1];
      let newSaleItem = new SaleItem(selectedProductObj, parseFloat(productAmount));
      this._saleItems.push(newSaleItem);
       
      Utils.showHeader("Producto agregado a la venta")
      newSaleItem.show();

      let continuee;

      do{
        continuee = Keyboard.readString("\n  =>Desea agregar otro producto (s/n): ");
      } while(Utils.numberValidator(continuee) || !(continuee.toLowerCase() === "s" || continuee.toLowerCase() === "n"));

      if(continuee.toLowerCase() === "s") this._navigateTo(4);

      let newSale = new Sale(this._saleItems);
      this._sales.push(newSale);

      console.clear();
      Utils.showHeader("Venta Realizada");
      newSale.show();
      this._saleItems = [];
    }
  }

  _showSales() {
    if (this._sales.length === 0) {
      console.info("Aún no has realizado ventas!");
      return;
    } else {
      console.log(`Venta numero ${this._count + 1}.\n`);
      this._sales[this._count].show();
      let navigateAcction = Keyboard.readString("\n ==>Introduzca (s,a,q) para ver la venta (siguiente, anteriro, salir) respectivamente: ").toLowerCase();
      
      if(!(navigateAcction === "s" || navigateAcction === "a" || navigateAcction === "q")) this._navigateTo(5);
      
      if(navigateAcction === "s") this._count += 1;
      if(navigateAcction === "a") this._count -= 1;
      
      if(this._count > this._sales.length - 1){
        this._count = 0;
      }

      if(this._count < 0){
        this._count = this._sales.length - 1;
      }

      if(navigateAcction === "q") this.start();
      this._navigateTo(5);
    }
  }

  _exit() {
    console.clear();
    console.log("Saliendo...")
    process.exit(0);
  }

  _defaultAction() {
    console.clear();
    console.log("~~~~~ Opción invalida ~~~~~");
    Utils.pause("continuar");
    this.start();
  }
}