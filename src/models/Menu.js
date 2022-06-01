import Utils from "../utils.js";
import Keyboard from "./Keyboard.js"

export default class Menu{
  constructor(options = []){
    this._options = options;
  }

  show() {
    Utils.showHeader("Menu");
    this._options.forEach((option, i) => {
      console.log(`${i+1}.- ${option}`);
    })

    return Keyboard.readNumber("\n  =>Selecciona una opcion: ");
  }
}