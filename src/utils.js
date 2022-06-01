import Keyboard from "./models/Keyboard.js";

export default class Utils {
  static showHeader(msg = "...") {
    console.log(`=====[ ${msg} ]=====\n`);
  }

  static validateOptionFromMenu(selectedOption = 0) {
    if (selectedOption >= 0 && selectedOption <= 6) return true;
    if (!parseInt(selectedOption)) return false;
    return true;
  }

  static pause(actionMsg = "...") {
    Keyboard.readString(`\n  =>Presione ENTER para ${actionMsg}`);
  }

  static validateInputInAddProduct(productName = "", productPrice = ""){
    if(!isNaN(productPrice)){
      let productPriceToNumber = parseFloat(productPrice);
      return productName !== "" && productPriceToNumber > 0;
    }
    return false;   
  }

  static validateRange(start, end, number){
    return number >= start && number <= end;
  }

  static numberValidator(x = ""){
    if(x === "") return false;
    if(!isNaN(x)) return true;
    return false;
  }
}
