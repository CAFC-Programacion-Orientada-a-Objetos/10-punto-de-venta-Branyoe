import readlineSync from 'readline-sync';

export default class Keyboard {
  static readString(msg) {
    var value = readlineSync.question(msg);

    return value;
  }

  static readNumber(msg) {
    var value = readlineSync.question(msg);
    return Number(value);
  }
}