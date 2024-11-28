import NReact from "../NReact.js";

/**
 * @param {HTMLHeadingElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Titulo(props = {}, ...list) {
  const h2 = NReact("h2", props, list);
  return h2;
}