import NReact, { adicionaFilhos } from "../NReact.js";

/**
 * @param {HTMLDialogElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Dialog(props = {}, ...list) {
  const dialog = NReact("dialog", props, list);

  adicionaFilhos(dialog, [
    NReact("button", { className: "close", onclick: () => { dialog.close() } }),
  ]);
  document.body.insertAdjacentElement("afterend",dialog);
  return dialog;
}