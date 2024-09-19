/** @typedef {{ src: string; sizes: string; type: string; }} DadosImagem */

import ArrayNaoRepete from "./ArrayNaoRepete.js";

export default class Icones {

  /** @returns {Promise<DadosImagem[]>} */
  static async localizar() {
    const listaDeLink = [];
    const buscar = new ArrayNaoRepete();
    buscar.mais(location.origin + "/favicon.ico");
    buscar.mais(location.origin + "/favicon.png");
    buscar.mais(location.origin + (location.pathname + "/favicon.ico").replace("//","/"));
    buscar.mais(location.origin + (location.pathname + "/favicon.png").replace("//","/"));

    document.querySelectorAll("link[rel*='icon']").forEach((elemento) => {
      buscar.mais(elemento.href);
    });

    for (let urlDaImagem of buscar) {
      try {
        listaDeLink.push(
          await Icones.pegarTamanhoETipoURL(urlDaImagem)
        );
      } catch (erro) {
        console.info(erro.message);
      }
    }
    return listaDeLink;
  }

  /**
   * @param {File} arquivo
   * @returns {DadosImagem}
   */
  static async pegarTamanhoETipoArquivo(arquivo) {
    const blob = new Blob([arquivo], { type: arquivo.type });
    return await Icones.pegarTamanhoETipoURL(URL.createObjectURL(blob));
  }

  /**
   * @param {string} urlDaImagem
   * @returns {DadosImagem}
   */
  static async pegarTamanhoETipoURL(urlDaImagem) {

    const response = await fetch(urlDaImagem);
    if (!response.ok) {
      throw new Error("Não foi possível localizar: " + urlDaImagem);
    }

    const contentType = response.headers.get('Content-Type');
    const responseBlob = await response.blob();
    const tagIMG = new Image();
    const objectURL = URL.createObjectURL(responseBlob);
    const base64 = await Icones.convertImageToBase64(urlDaImagem);

    const valores = await new Promise((resolve, reject) => {
      tagIMG.src = objectURL;
      tagIMG.onload = () => {
        const width = tagIMG.width;
        const height = tagIMG.height;
        if (width != height) {
          reject("A imagem deve ser quadrada 1:1");
        }
        resolve({ src: base64, sizes: `${width}x${height}`, type: contentType });
      };

      tagIMG.onerror = (erroCarregar) => {
        reject("Não foi possível carregar a imagem: " + objectURL);
      };
    });
    return { src: valores.src, sizes: valores.sizes, type: valores.type };
  }

  static async convertImageToBase64(imageUrl) {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error(`Erro ao buscar a imagem: ${response.statusText}`);
      }
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(new Error("Erro ao converter Blob para Base64"));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  }


}