import Manifest from "./Manifest.js";
import Arquivos from "./Arquivos.js";

/** @typedef {import("./Icones.js").DadosImagem} DadosImagem */

const form = document.querySelector("form");
const tabela = document.querySelector("tbody");
/** @type {HTMLSpanElement} */
const linkDeOrigem = document.getElementById("linkDeOrigem");

/** @type {{ source: Window; origin: string; }} */
const origem = { source: null, origin: null };

window.addEventListener("message", (event) => {
  origem.source = event.source;
  origem.origin = event.origin;
  linkDeOrigem.textContent = event.origin;
  document.querySelector("input[name=nomeDaPagina]").value = event.data.title;
  carregarIconesExistentes(event.data.icones);
});


/** @param {DadosImagem[]} dadosImagem */
function carregarIconesExistentes(dadosImagem) {
  dadosImagem.forEach((dadoImagem) => {
    criarLinha(dadoImagem);
  });
}

const novoArquivo = new Arquivos(document.querySelector("#novoarquivo"), criarLinha);

const botao = document.querySelector("button[type=submit]");
botao.addEventListener("click", () => { novoArquivo.seExistem() });

/** @param {DadosImagem} dadosImagem */
function criarLinha(dadosImagem) {
  const tr = criarElemento("tr");
  tr.insertAdjacentElement("beforeend", criarElemento("td", criarElemento("div", `<img src="${dadosImagem.src}" />`, "imagemBox")));
  tr.insertAdjacentElement("beforeend", criarElemento("td", dadosImagem.type));
  tr.insertAdjacentElement("beforeend", criarElemento("td", dadosImagem.sizes));
  tr.insertAdjacentElement("beforeend", criarElemento("td", `<label class="form-check-label w-100 mascarar"><input mascaravel class="form-check-input" type="checkbox" /><span class="ifMascable"></span></label>`));
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
  manifest.start_url = origem.origin + manifest.start_url;
  manifest.icons = icones();

  botao.disabled = true;
  setTimeout(() => {
    botao.disabled = false;
  }, 5000);

  origem.source.postMessage({ manifest: manifest.gerar() }, origem.origin);
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

