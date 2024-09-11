export default class Manifest {

  /** @type {string} */ #name;
  /** @type {"standalone"|"window-controls-overlay"|"minimal-ui"|"fullscreen"|"browser"} */ display;
  /** @type {string} */ #start_url;
  icons = [];

  set name(value) {
    this.#name = value;
  };
  get name() {
    return this.#name || document.title;
  };
  set start_url(value) {
    this.#start_url = value;
  };
  get start_url() {
    return this.#start_url || "/";
  };
  get short_name() {
    return this.name.substring(0, 12);
  }

  gerar() {
    const manifesto = JSON.stringify({
      name: this.name,
      short_name: this.short_name,
      start_url: this.start_url,
      display: this.display,
      icons: this.icons
    }, 0, 2);
    return manifesto;
  }

  /** @param {string} manifest */
  static instalar(manifest) {
    document.querySelector("link[rel=manifest]")?.remove();
    const linkdadosManifest = document.createElement('link');
    const blobdadosManifest = new Blob([manifest], { type: 'application/json' });
    linkdadosManifest.rel = "manifest";
    linkdadosManifest.href = window.URL.createObjectURL(blobdadosManifest);
    document.head.appendChild(linkdadosManifest);
  }

}