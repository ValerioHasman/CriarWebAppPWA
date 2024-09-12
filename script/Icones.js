/** @typedef {{ src: string; sizes: string; type: string; }} DadosImagem */

export default class Icones {

  /** @returns {DadosImagem[]} */
  static async localizar() {
    const listaDeLink = [];
    try {
      listaDeLink.push(
        await Icones.pegarTamanhoETipoURL(location.origin + "/favicon.ico")
      );
    } catch (erro) {
      console.info(erro.message);
    }
    try {
      listaDeLink.push(
        await Icones.pegarTamanhoETipoURL(location.origin + "/favicon.png")
      );
    } catch (erro) {
      console.info(erro.message);
    }
    document.querySelectorAll("link[rel*='icon']").forEach(async (elemento) => {
      try {
        listaDeLink.push(
          await Icones.pegarTamanhoETipoURL(elemento.href)
        );
      } catch (erro) {
        console.info(erro.message);
      }

    });
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
      throw new Error("Não foi possível colocar " + urlDaImagem);
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

      tagIMG.onerror = () => {
        throw new Error("Não foi possível carregar a imagem");
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