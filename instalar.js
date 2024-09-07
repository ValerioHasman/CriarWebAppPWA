import Manifest from "./script/Manifest.js";
import Icones from "./script/Icones.js";

const janela = window.open("https://valeriohasman.github.io/CriarWebAppPWA/", "_blank");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  var b = document.createElement("button");
  b.addEventListener("click", () => {
    event.prompt();
  })
  document.body.append(b);
  b.style.position = "fixed";
  b.style.bottom = "0";
  b.style.right = "0";
  b.style.zIndex = "2000";
  b.style.fontSize = "3em";
  b.style.margin = "1em";
  b.style.borderRadius = "1rem";
  b.style.padding = "0 1rem";
  b.style.fontWeight = "bold";
  b.style.boxShadow = "0 1rem 3rem rgba(0, 0, 0, 0.175)";
  b.innerHTML = "Instalar PWA!";
  b.focus();
  event.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
      }
      b.remove();
    })
});


/** @param {Manifest} manifest */
function manifestados(manifest) {
  manifest.start_url = location.origin + manifest.start_url;
  Manifest.instalar(manifest.gerar());
}

janela.dadosManifesto = {
  titulo: document.title,
  iconesExistentes: Icones.localizar()
}

let loopDaJanela = setInterval(function () {
  if (janela.closed) {
    manifestados(janela.dadosManifesto.manifest);
    clearInterval(loopDaJanela);
  }
}, 1000);

