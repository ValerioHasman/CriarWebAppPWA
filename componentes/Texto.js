import NReact from "../NReact.js";

/**
 * @param {HTMLParagraphElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Texto(props = {}, ...list) {
  const p = NReact("p", props, list);
  return p;
}