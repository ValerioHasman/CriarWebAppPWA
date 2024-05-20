(() => {
  "use strict"

  class CriarManifest {

    /** @type {string} */ #nome;
    /** @type {string} */ #nomeCurto;
    /** @type {string} */ #descricao;
    /** @type {string} */ #start;
    /** @type {string} */ #imagem;
    /** @type {string} */ #tamanho;
    /** @type {boolean} */ #maskable;
    /** @type {string} */ #iconesJaExistentes;

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
    set imagem(value) {
      this.#imagem = value;
    };
    get imagem() {
      return this.#imagem || "https://valeriohasman.github.io/CriarWebAppPWA/icon.png";
    };
    set tamanho(value) {
      this.#tamanho = value;
    };
    get tamanho() {
      return this.#tamanho || "144";
    };
    set maskable(value) {
      this.#maskable = Boolean(value);
    };
    get maskable() {
      return Boolean(this.#maskable);
    };

    defineIconesJaExistentes() {
      const arrobjeto = [];

      document.querySelectorAll("link[rel*='icon']").forEach((dado) => {
        arrobjeto.push({
          src: dado.href || undefined,
          type: dado.type || undefined,
          sizes: dado.sizes.value || undefined,
          purpose: `any${this.maskable ? " maskable" : ""}`
        });
      });

      this.#iconesJaExistentes = JSON.stringify(arrobjeto, 0, 2);
    }

    iconePreDefinido() {

      let tipoDeImagem = '';
      let tamanhoDaImagem = `${this.tamanho}x${this.tamanho}`;

      switch ((this.imagem.match(/\.([^.]+)$/)[0]).toLowerCase()) {
        case '.png':
          tipoDeImagem = "image/png";
          break;
        case '.ico':
          tipoDeImagem = "image/x-icon";
          break;
        case '.svg':
          tipoDeImagem = "image/svg+xml";
          tamanhoDaImagem = "any";
          break;
        case '.gif':
          tipoDeImagem = "image/gif";
          break;
        case '.webp':
          tipoDeImagem = "image/webp";
          break;
        case '.jpg':
          tipoDeImagem = "image/jpg";
          break;
        default:
          alert("⚠️ Imagem não compatível!");
          break;
      }

      return `[
        {
          "src": "${this.imagem}",
          "type": "${tipoDeImagem}",
          "sizes": "${tamanhoDaImagem}",
          "purpose": "any${this.maskable ? " maskable" : ""}"
        }
      ]`;
    };

    static encurtarNome(nome = '') {
      return nome.substring(0, 12);
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
        "icons": ${this.#iconesJaExistentes || this.iconePreDefinido()}
      }`;
    }
  }

  document.querySelector("link[rel*='manifest']")?.remove();

  const dadosManifest = new CriarManifest();

  dadosManifest.nome = prompt("Nome para a página:", document.title);
  dadosManifest.descricao = prompt("Descricão (opcional):");
  dadosManifest.start = prompt("Início da página:", "/");

  if (confirm("Localizar imagem automaticamente?")) {
    dadosManifest.defineIconesJaExistentes();
  } else {
    dadosManifest.imagem = prompt("Link para uma imagem 1:1:", "https://valeriohasman.github.io/CriarWebAppPWA/icon.png");
    dadosManifest.tamanho = prompt("Tamanho² da imagem:", "144");
  }
  dadosManifest.maskable = confirm("Habilitar o modo mascarável?");

  const linkdadosManifest = document.createElement('link');
  linkdadosManifest.rel = "manifest";

  const blobdadosManifest = new Blob([dadosManifest.toString()], { type: 'application/json' });
  const urldadosManifest = window.URL.createObjectURL(blobdadosManifest);
  linkdadosManifest.href = urldadosManifest;

  document.head.appendChild(linkdadosManifest);

  if(confirm("Agora pode ser possível instalar a página web!\n\nDeseja visitar o perfil do Desenvolvedor?")){
    void window.open("https://valeriohasman.github.io/portfolio/portifolio.html", "_blank");
  }

})();