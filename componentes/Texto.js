import NReact from "../NReact.js";

/**
 * @param {HTMLParagraphElement} props
 * @param {...HTMLElement|string} list 
 */
export function Paragrafo(props = {}, ...list) {
  const p = NReact("p", props, list);
  return p;
}

/**
 * @param {HTMLSpanElement} props
 * @param {...HTMLElement|string} list 
 */
export function Frase(props = {}, ...list) {
  const span = NReact("span", props, list);
  return span;
}

/**
 * @param {HTMLHeadingElement} props
 * @param {...HTMLElement|string} list 
 */
export function Titulo(props = {}, ...list) {
  const h2 = NReact("h2", props, list);
  return h2;
}