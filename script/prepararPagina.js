import NReact, { adicionaFilhos } from "../NReact.js";

export default function prepararPagina() {
  removeChildren(document.head);
  removeChildren(document.body);

  adicionaFilhos(document.head, [
    NReact("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    NReact("link", { rel: "stylesheet", href: "https://valeriohasman.github.io/CriarWebAppPWA/style/parapagina.css" })
    //NReact("link", { rel: "stylesheet", href: "http://localhost/CriarWebAppPWA/style/parapagina.css" })
  ])
}

function removeChildren(element) {
  const arr = element.querySelectorAll(":scope > *");
  for (const els of arr) {
    els.remove();
  }
}