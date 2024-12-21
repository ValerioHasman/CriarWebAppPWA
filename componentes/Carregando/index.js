import NReact, { Urli } from "../../NReact.js";
import Botao from "../Botao.js";
import { Paragrafo, Titulo } from "../Texto.js";

export default function Carregando() {
  const section = Section({},
    StyleCarga(),
    Titulo({}, "Aguarde…"),
    Div({ role: "progressbar" },
      Div()
    ),
    Div({ className: "corsErr" },
      Paragrafo({}, "Hum… Pode ter ocorrido um problema de CORS, o site possivelmente não permite scripts externos."),
      Botao({ type: "button", onclick: () => { window.location.reload(); } },
        "↻ Voltar ao site"
      )
    )
  )
  return section;
}

/**
 * @param {HTMLElement} props
 * @param {...HTMLElement|string} list 
 */
function Section(props = {}, ...list) {
  const section = NReact("section", props, list);
  return section;
}

/**
 * @param {HTMLDivElement} props
 * @param {...HTMLElement|string} list 
 */
export function Div(props = {}, ...list) {
  const div = NReact("div", props, list);
  return div;
}

function StyleCarga() {
  return NReact("link", { rel: "stylesheet", href: Urli("componentes/Carregando/estilo.css") });
}
