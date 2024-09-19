import Icones from "./Icones.js";

export default class Dados extends EventTarget {

  title = document.title;
  icones = [];
  list = [location.pathname];

  constructor() {
    super();
    Icones.localizar().then((arr) => {
      this.icones = arr;
      this.dispatchEvent(new CustomEvent('load'));
    });
    !location.search || this.list.push(location.pathname + location.search);
  }

  load(){
    return new Promise((resolve)=>{
      this.addEventListener("load", ()=>{
        resolve("Ok");
      })
    });
  }
}