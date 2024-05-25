(() => {
  "use strict"

  class IconeManifest {

    /**
     * @param {string} urlDaImagem
     * @returns {Promise<{src, sizes, type}>}
     */
    static async pegarTamanhoETipoDeImagem(urlDaImagem) {

      const objetoRejeitado = { src: urlDaImagem, sizes: undefined, type: undefined };

      try {

        const response = await fetch(urlDaImagem);
        if (!response.ok) {
          return new Promise((resolve, reject) => {
            reject(objetoRejeitado);
          });
        }

        const contentType = response.headers.get('Content-Type');
        const responseBlob = await response.blob();
        const propriedadesDaImagem = new Image();
        const objectURL = URL.createObjectURL(responseBlob);

        return new Promise((resolve, reject) => {
          propriedadesDaImagem.src = objectURL;

          propriedadesDaImagem.onload = () => {
            const width = propriedadesDaImagem.width;
            const height = propriedadesDaImagem.height;
            URL.revokeObjectURL(objectURL);
            resolve({ src: urlDaImagem, sizes: `${width}x${height}`, type: contentType });
          };

          propriedadesDaImagem.onerror = () => {
            URL.revokeObjectURL(objectURL);
            objetoRejeitado.type = contentType;
            reject(objetoRejeitado);
          };
        });
      } catch (error) {
        return new Promise((resolve, reject) => {
          reject(objetoRejeitado);
        });
      }
    }

  }

  class CriarManifest {

    /** @type {string} */ #nome;
    /** @type {string} */ #nomeCurto;
    /** @type {string} */ #descricao;
    /** @type {string} */ #start;
    /** @type {string} */ #tamanho;
    /** @type {boolean} */ #maskable;
    /** @type {number} */ #numeroImagensPendentes = 0;
    /** @type {any[]} */ #iconesFornecidos = [];


    constructor() {
      document.querySelector("link[rel*='manifest']")?.remove();
      this.defineIconesJaExistentes();
    }

    set nome(value) {
      this.#nome = value;
    };
    get nome() {
      return this.#nome || document.title;
    };
    set nomeCurto(value) {
      this.#nomeCurto = value;
    };
    get nomeCurto() {
      return CriarManifest.encurtarNome(this.#nomeCurto || this.nome);
    };
    set descricao(value) {
      this.#descricao = value;
    };
    get descricao() {
      return this.#descricao || this.nome;
    };
    set start(value) {
      this.#start = value;
    };
    get start() {
      return this.#start || "/";
    };
    set tamanho(value) {
      this.#tamanho = value;
    };
    get tamanho() {
      return this.#tamanho || "512";
    };
    set maskable(value) {
      this.#maskable = Boolean(value);
    };
    get maskable() {
      return Boolean(this.#maskable);
    };
    get numeroImagensPendentes() {
      return this.#numeroImagensPendentes;
    };

    icones() {
      return JSON.stringify(this.#iconesFornecidos, 0, 2);
    }

    defineIconesJaExistentes() {
      document.querySelectorAll("link[rel*='icon']").forEach((linkRelIcon) => {
        this.adicionarIcone(linkRelIcon.href)
      });
    }

    /** @param {string} urlDaImagem  */
    adicionarIcone(urlDaImagem) {
      void this.#numeroImagensPendentes++;
      (async () => {
        let objetoDeIcone = undefined;
        try {
          void new URL(urlDaImagem);
          void await IconeManifest.pegarTamanhoETipoDeImagem(urlDaImagem)
            .then((res) => {
              objetoDeIcone = res;
            })
            .catch((err) => {
              objetoDeIcone = err;
            });
        } catch (err) {
          console.log("Invalid URL!");
        }
        if (objetoDeIcone) {
          objetoDeIcone.purpose = `any${this.maskable ? " maskable" : ""}`;
          this.#iconesFornecidos.push(objetoDeIcone);
        }
        void this.#numeroImagensPendentes--;
      })();
    }

    static encurtarNome(nome = '') {
      return nome.substring(0, 12);
    }

    async #esperaPendentes(){
      return new Promise((resolve) => {
        const intervalo = setInterval(() => {
          if (this.#numeroImagensPendentes == 0) {
            clearInterval(intervalo);
            resolve();
          }
        }, 100);
      });
    }
    
    async instalar() {
      void await this.#esperaPendentes();
      const linkdadosManifest = document.createElement('link');
      linkdadosManifest.rel = "manifest";
      const blobdadosManifest = new Blob([this.toString()], { type: 'application/json' });
      const urldadosManifest = window.URL.createObjectURL(blobdadosManifest);
      linkdadosManifest.href = urldadosManifest;
      document.head.appendChild(linkdadosManifest);
    }

    toString() {
      return `{
        "name": "${this.nome}",
        "short_name": "${this.nomeCurto}",
        "start_url": "${location.origin}${this.start}",
        "display_override": [
          "standalone",
          "window-controls-overlay",
          "minimal-ui",
          "fullscreen",
          "browser"
        ],
        "display": "standalone",
        "description": "${this.descricao}.",
        "lang": "pt-BR",
        "icons": ${this.icones()}
      }`;
    }
  }

  const dadosManifest = new CriarManifest();

  dadosManifest.nome = prompt("🏷️ Nome do Web App:", document.title);
  dadosManifest.start = prompt("🔰 Iniciar página em:", "/");
  dadosManifest.maskable = confirm("🖼️ Habilitar o modo mascarável para os ícones?");

  while (confirm(`⚙️ Quer fornecer mais uma imagem para garantir o funcionamento?\n${dadosManifest.numeroImagensPendentes} ícones encontrados.`)) {
    dadosManifest.adicionarIcone(
      prompt("✨ Link de uma imagem 1:1:", "https://valeriohasman.github.io/CriarWebAppPWA/icon.png")
    );
  }

  dadosManifest.instalar()
    .then(()=>{
      if (confirm("🌎 Agora pode ser possível instalar a página web!\n\nDeseja visitar o perfil do Desenvolvedor?")) {
        void window.open("https://valeriohasman.github.io/portfolio/portifolio.html", "_blank");
      }
    });

})();
