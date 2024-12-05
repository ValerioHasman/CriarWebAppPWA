import NReact from "../NReact.js";

/**
 * @param {HTMLAnchorElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Ancora(props = {}, ...list) {
  const a = NReact("a", props, list);
  return a;
}