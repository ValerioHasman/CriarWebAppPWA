import Icones from "./Icones.js";
import Manifest from "./Manifest.js";

/** @typedef {{ tagIMG: HTMLImageElement; src: string; sizes: string; type: string; }} DadosImagem */


const form = document.querySelector("form");
const tabela = document.querySelector("tbody");

const dadosManifesto = window?.dadosManifesto ?? {};
const iconesExistentes = window?.dadosManifesto?.iconesExistentes ?? [];

document.querySelector("input[name=nomeDaPagina]").value = dadosManifesto.titulo;

iconesExistentes.forEach(async (link) => {
  criarLinha(await Icones.pegarTamanhoETipoURL(link.href));
});

/** @type {HTMLInputElement} */
let novoArquivo = document.querySelector("#novoarquivo");

novoArquivo.onchange = async (event) => {

  novoArquivo.disabled = true;

  criarLinha(await Icones.pegarTamanhoETipoArquivo(novoArquivo.files[0]));

  novoArquivo.disabled = false;
  novoArquivo.value = "";
}


/** @param {DadosImagem} dadosImagem */
function criarLinha(dadosImagem) {
  const tr = criarElemento("tr");
  tr.insertAdjacentElement("beforeend", criarElemento("td", criarElemento("div", dadosImagem.tagIMG, "imagemBox")));
  tr.insertAdjacentElement("beforeend", criarElemento("td", dadosImagem.type));
  tr.insertAdjacentElement("beforeend", criarElemento("td", dadosImagem.sizes));
  tr.insertAdjacentElement("beforeend", criarElemento("td", `<label class="form-check-label w-100"><input mascaravel class="form-check-input" type="checkbox" /></label>`));
  tr.insertAdjacentElement("beforeend", criarElemento("td", `
    <input type="text" hidden imgtype />
    <input type="text" hidden imgsrc />
    <input type="text" hidden imgsizes />
    <button onclick="this.parentElement.parentElement.remove()" type="button" class="btn btn-danger m-1"><i class="bi bi-trash-fill"></i></button>` ));

  tr.querySelector("[imgtype]").value = dadosImagem.type;
  tr.querySelector("[imgsrc]").value = dadosImagem.src;
  tr.querySelector("[imgsizes]").value = dadosImagem.sizes;

  tabela.insertAdjacentElement("afterbegin", tr);
}

function criarElemento(tag = "div", filho, classe) {
  const elemento = document.createElement(tag);
  if (classe) {
    elemento.classList.add(classe)
  }
  if (filho) {
    if (filho.constructor.name == "String") {
      elemento.innerHTML = filho;
    } else if (filho instanceof HTMLElement) {
      elemento.insertAdjacentElement("beforeend", filho);
    }
  }
  return elemento;
}

form.onsubmit = (event) => {
  event.preventDefault();

  const manifest = new Manifest();

  manifest.name = document.querySelector("input[name=nomeDaPagina]").value;
  manifest.display = document.querySelector("select[name=display]").value;
  manifest.start_url = document.querySelector("input[name=caminho]").value;
  manifest.icons = icones();

  dadosManifesto.manifest = manifest;

  window.close();

}

function icones() {
  const trs = tabela.querySelectorAll("tr");
  const arr = [];
  for (let i = 0; i < trs.length - 1; i++) {
    const icon = {};
    icon.type = trs[i].querySelector("[imgtype]").value;
    icon.src = trs[i].querySelector("[imgsrc]").value;
    icon.sizes = trs[i].querySelector("[imgsizes]").value;
    icon.purpose = trs[i].querySelector("[mascaravel]").checked ? "any maskable" : "any";
    arr.push(icon);
  }
  return arr;
}