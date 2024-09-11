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

const iframe = iframePara("http://localhost/CriarWebAppPWA/");

document.body.append(iframe);

iframe.addEventListener("load", enviarDadosParaIFrame);

window.addEventListener("message", (event) => {
  Manifest.instalar(event.data.manifest);
})

function enviarDadosParaIFrame() {
  console.log(dados);
  iframe.contentWindow.postMessage(dados, '*');
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  const close = Notificacao("Pronto para instalar o site!", () => { event.prompt(); }, `Instalar<i class="bi ms-2 bi-download"></i>`);

  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        void Notificacao("Voltar para a o site?", () => { window.location.reload(); }, `Voltar<i class="bi ms-2 bi-arrow-return-left"></i>`, "success");
      }
      close();
    })
});
