import Carregando from "./script/Carregando.js";
import Dados from "./script/Dados.js";
import iframePara from "./script/iframePara.js";
import Manifest from "./script/Manifest.js";
import Notificacao from "./script/Notificacao.js";
import prepararPagina from "./script/prepararPagina.js";

const dados = new Dados();

document.body.innerHTML = Carregando;

await dados.load(); 

prepararPagina();

const iframe = iframePara("https://valeriohasman.github.io/CriarWebAppPWA/");

document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

window.addEventListener("message", (event) => {
  const erro = Notificacao("Não foi possível instalar. Tente colocar um ícone png 1:1 ou trocar o modo de exibição.", () => { erro.hide(); }, `<i class="bi bi-x-lg"></i>`, "danger");
  Manifest.instalar(event.data.manifest);
})

function enviarDadosParaIFrame() {
  iframe.contentWindow.postMessage({ title: dados.title, icones: dados.icones, list: dados.list }, '*');
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  void Notificacao("Pronto para instalar o site!", () => { event.prompt(); }, `Instalar<i class="bi ms-2 bi-download"></i>`);

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        void Notificacao("Tudo pronto, voltar para a o site?", () => { window.location.reload(); }, `Voltar<i class="bi ms-2 bi-arrow-return-left"></i>`, "success");
      }
    })
});
