import NReact, { adicionaFilhos } from "../NReact.js";

/**
 * @param {HTMLDialogElement} props
 * @param {...HTMLElement|string} list 
 */
export default function Dialog(props = {}, ...list) {
  const btnclose = NReact("button", { className: "close", onclick: () => { dialog.close() } })
  const dialog = NReact("dialog", props, [...[btnclose], ...list]);
  document.body.append(dialog);
  fechaDialogs();
  dialog.showModal();
}

function fechaDialogs() {
  document.querySelectorAll("dialog[open]").forEach((dialog) => {
    dialog.close();
  });
}