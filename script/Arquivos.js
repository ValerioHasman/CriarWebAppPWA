/** @typedef {{ tagIMG: HTMLImageElement; src: string; sizes: string; type: string; }} DadosImagem */

import Icones from "./Icones.js";

export default class Arquivos{
  /** @type {HTMLInputElement} */ #inputDeNovosArquivos;
  criarLinha;

  /** 
   * @param {HTMLInputElement} inputDeNovosArquivos 
   * @param {(dadosImagem: DadosImagem) => void} criarLinha
   */
  constructor(inputDeNovosArquivos, criarLinha){
    this.#inputDeNovosArquivos = inputDeNovosArquivos;
    this.criarLinha = criarLinha;
    this.#inputDeNovosArquivos.addEventListener("change", ()=>{ this.validar() });
  }
  get inputDeNovosArquivos (){
    return this.#inputDeNovosArquivos;
  }
  async validar(){
    try {
      this.criarLinha(await Icones.pegarTamanhoETipoArquivo(this.inputDeNovosArquivos.files[0]));
      this.inputDeNovosArquivos.setCustomValidity("");
    } catch (erro) {
      if(erro?.message){
        this.inputDeNovosArquivos.setCustomValidity(erro.message);
      } else {
        this.inputDeNovosArquivos.setCustomValidity(erro);
      }
    }
    this.inputDeNovosArquivos.reportValidity();
  
    window.scroll({
      top: window.innerHeight,
      behavior: "smooth",
    });
    this.inputDeNovosArquivos.value = "";
  }

  seExistem(){
    if (!document.querySelector("[imgsrc]")) {
      this.inputDeNovosArquivos.setCustomValidity("Insira pelo menos uma imagem 1:1");
      this.inputDeNovosArquivos.reportValidity();
    } else {
      this.inputDeNovosArquivos.setCustomValidity("");
      this.inputDeNovosArquivos.reportValidity();
    }
  }
}