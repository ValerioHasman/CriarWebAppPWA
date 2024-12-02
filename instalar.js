import Botao from "./componentes/Botao.js";
import Dialog from "./componentes/Dialog.js";
import Texto from "./componentes/Texto.js";
import Titulo from "./componentes/Titulo.js";
import Carregando from "./script/Carregando.js";
import Dados from "./script/Dados.js";
import iframePara from "./script/iframePara.js";
import Manifest from "./script/Manifest.js";
import prepararPagina from "./script/prepararPagina.js";

Carregando();

const dados = new Dados();

await dados.load();

prepararPagina();

// const iframe = iframePara("http://localhost/CriarWebAppPWA/");
const iframe = iframePara("https://valeriohasman.github.io/CriarWebAppPWA/");

document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

window.addEventListener("message", (event) => {
  Dialog(
    {},
    Titulo({}, "Pode ter ocorrido um erro!"),
    Texto({}, "Talvez não tenha sido possível instalar. Tente colocar um ícone PNG 1:1 de 512px², ou trocar o modo de exibição, ou instalar manualmente."),
    Botao({ onclick: function () { this.parentElement.close() } }, "Cancelar")
  );
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
    Botao({ onclick: () => { event.prompt(); } }, "Instalar")
  );

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        Dialog(
          {},
          Titulo({}, "Tudo pronto"),
          Texto({}, "Voltar para a o site?"),
          Botao({ onclick: () => { window.location.reload(); } }, "Voltar")
        );
      }
    })
});
