import Icones from "./script/Icones.js";
import iframePara from "./script/iframePara.js";
import Manifest from "./script/Manifest.js";
import Notificacao from "./script/Notificacao.js";
import prepararPagina from "./script/prepararPagina.js";

const dados = {
  title: document.title,
  icones: await Icones.localizar()
};

prepararPagina();

const iframe = iframePara("https://valeriohasman.github.io/CriarWebAppPWA/");

document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

const erro = Notificacao("Não foi possível instalar. Tente colocar um ícone png 1:1 ou trocar o modo de exibição.", () => { erro.hide(); }, `<i class="bi bi-x-lg"></i>`, "danger");
erro.hide();

window.addEventListener("message", (event) => {
  Manifest.instalar(event.data.manifest);
  erro.show();
})

function enviarDadosParaIFrame() {
  iframe.contentWindow.postMessage(dados, '*');
}

window.addEventListener("beforeinstallprompt", (event) => {
  erro.hide();
  event.preventDefault();
  const sucesso = Notificacao("Pronto para instalar o site!", () => { event.prompt(); }, `Instalar<i class="bi ms-2 bi-download"></i>`);

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        void Notificacao("Tudo pronto, voltar para a o site?", () => { window.location.reload(); }, `Voltar<i class="bi ms-2 bi-arrow-return-left"></i>`, "success");
      }
      sucesso.hide();
    })
});
