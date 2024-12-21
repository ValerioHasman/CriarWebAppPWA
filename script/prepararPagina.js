import NReact, { adicionaFilhos, Urli } from "../NReact.js";

export default function prepararPagina() {
  removeChildren(document.querySelector("html"));
  removeChildren(document.head);
  removeChildren(document.body);

  adicionaFilhos(document.head, [
    NReact("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    NReact("link", { rel: "stylesheet", href: Urli("style/parapagina.css") })
  ])
}

/** @param {HTMLElement} element */
export function removeChildren(element) {
  const arr = element.querySelectorAll(":scope > *:not(body):not(head):not(html)");
  for (const els of arr) {
    els.remove();
  }
  console.log(element)
}