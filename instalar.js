import Dialog from "./componentes/Dialog.js";
import Texto from "./componentes/Texto.js";
import Titulo from "./componentes/Titulo.js";
import NReact from "./NReact.js";
import Carregando from "./script/Carregando.js";
import Dados from "./script/Dados.js";
import iframePara from "./script/iframePara.js";
import Manifest from "./script/Manifest.js";
import prepararPagina from "./script/prepararPagina.js";

const dados = new Dados();

document.body.innerHTML = Carregando;

await dados.load();

prepararPagina();

// const iframe = iframePara("http://localhost/CriarWebAppPWA/");
const iframe = iframePara("https://valeriohasman.github.io/CriarWebAppPWA/");

document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

window.addEventListener("message", (event) => {
  const erro = Dialog(
    {},
    Titulo({}, "Pode ter ocorrido um erro."),
    Texto({}, "Talvez não tenha sido possível instalar. Tente colocar um ícone PNG 1:1, ou trocar o modo de exibição, ou instalar manualmente."),
    NReact("button", { onclick: function () { this.parentElement.close() } }, ["Cancelar"]),
  )
  erro.showModal();
  Manifest.instalar(event.data.manifest);
})

function enviarDadosParaIFrame() {
  iframe.contentWindow.postMessage({ title: dados.title, icones: dados.icones, list: dados.list }, '*');
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  Dialog(
    {},
    Titulo({}, "Pronto para instalar o site!"),
    Texto({}, "Instale e aproveite."),
    NReact("button", { onclick: () => { event.prompt(); } }, ["Instalar"]),
  ).showModal();

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        Dialog(
          {},
          Titulo({}, "Tudo pronto"),
          Texto({}, "Voltar para a o site?"),
          NReact("button", { onclick: () => { window.location.reload(); } }, ["Voltar"]),
        ).showModal();
      }
    })
});
