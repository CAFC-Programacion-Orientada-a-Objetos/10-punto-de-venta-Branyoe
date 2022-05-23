import Keyboard from "../keyboard.js"

export default class Menu{
  constructor(options = []){
    this._options = options;
  }

  show() {
    console.log("====[ Menu pricipal ]====");
    this._options.forEach((option) => {
      console.log(`${option.id}.- ${option.name}`);
    })


    

    return Keyboard.readNumber("Selecciona una opcion: ");
  }
}