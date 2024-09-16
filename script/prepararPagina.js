import instalarBootStrap from "./instalarBootStrap.js";

export default function prepararPagina() {
  document.head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1" />`;
  document.body.innerHTML = "";
  instalarBootStrap();
}
