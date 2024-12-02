import NReact from "../NReact.js";

/**
 * @param {HTMLButtonElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Botao(props = {}, ...list) {
  const btn = NReact("button", props, list);
  btn.classList.add("mt");
  return btn;
}