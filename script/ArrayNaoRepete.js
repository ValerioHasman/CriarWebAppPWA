export default class ArrayNaoRepete extends Array {
  constructor() {
    super();
  }
  mais(valor) {
    let inserir = true;
    for (let item of this) {
      if (item === valor) {
        inserir = false;
        break;
      }
    }
    if (inserir) {
      this.push(valor);
    }
  }
}
