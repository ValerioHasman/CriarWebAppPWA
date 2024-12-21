import Ancora from "./componentes/Ancora.js";
import Botao from "./componentes/Botao.js";
import Dialog from "./componentes/Dialog.js";
import { Frase, Paragrafo, Titulo } from "./componentes/Texto.js";
import Carregando from "./componentes/Carregando/index.js";
import Dados from "./script/Dados.js";
import iframePara from "./script/iframePara.js";
import Manifest from "./script/Manifest.js";
import prepararPagina, { removeChildren } from "./script/prepararPagina.js";
import { Urli } from "./NReact.js";

removeChildren(document.body);

document.body.append(Carregando());

const dados = new Dados();

await dados.load();

prepararPagina();

//document.querySelector("link[rel=manifest]")?.remove();

const iframe = iframePara(Urli("/"));

const manifestd = document.querySelector("link[rel=manifest]");
manifestd?.remove()

Dialog(
  {},
  Titulo({}, "Esse site já é istalável!"),
  Paragrafo({}, "Deseja ", Frase({ style: { fontWeight: "bold" } }, "Continuar"), " a nova instalação?"),
  Botao({ onclick: function () { window.location.reload(); } }, "Voltar"),
  Botao({ onclick: function () { document.head.append(manifestd) } }, "Instalar"),
  Botao({ onclick: function () { this.parentElement.close() } }, "Continuar")
);
document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

window.addEventListener("message", (event) => {
  Dialog(
    {},
    Titulo({}, "Pode ter ocorrido um erro!"),
    Paragrafo({}, "Talvez não tenha sido possível instalar. Tente colocar um ícone PNG 1:1 de 512px², ou trocar o modo de exibição, ou instalar manualmente, ou usar a ",
      Ancora({ href: "https://valeriohasman.github.io/CriarWebAppPWA/icon.png", target: "_blank", download: "" },
        "Logo do App."
      )
    ),
    Botao({ onclick: function () { this.parentElement.close() } }, "Cancelar")
  );
  Manifest.instalar(event.data.manifest);
})

function enviarDadosParaIFrame() {
  iframe.contentWindow.postMessage({ title: dados.title, icones: dados.icones, list: dados.list }, '*');
}

window.addEventListener("beforeinstallprompt", (event) => {
  console.log(event)
  console.log(event.constructor.name)
  event.preventDefault();
  Dialog(
    {},
    Titulo({}, "Pronto para instalar o site!"),
    Paragrafo({}, "Instale e aproveite."),
    Botao({ onclick: () => { event.prompt(); } }, "Instalar")
  );

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        Dialog(
          {},
          Titulo({}, "Tudo pronto"),
          Paragrafo({}, "Voltar para a o site?"),
          Botao({ onclick: () => { window.location.reload(); } }, "Voltar")
        );
      }
    })
});
