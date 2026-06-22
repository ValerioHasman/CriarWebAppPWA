(function () {
  'use strict';
  function execute(it, ...funs) {
    for (const fun of funs)
      fun(it);
    return it;
  }
  function NReact(tagName, props = {}, nodulo = []) {
    const element = document.createElement(tagName);
    element.append(...nodulo);
    element.a = a;
    element.a(props);
    return element;
  }
  function a(nvsProps, paraObj, pai) {
    const esteElmt = this ?? paraObj;
    for (const prop in nvsProps) {
      if (
        typeof esteElmt[prop] != "function" &&
        typeof nvsProps[prop] == "object" &&
        !(nvsProps[prop] instanceof Node)
      ) {
        a(nvsProps[prop], esteElmt[prop], pai ?? esteElmt);
      } else if (
        typeof esteElmt[prop] == "function" &&
        Array.isArray(nvsProps[prop])
      ) {
        esteElmt[prop](...nvsProps[prop]);
      } else {
        try {
          esteElmt[prop] = nvsProps[prop];
        } catch (err) {
          esteElmt.setAttribute(prop, nvsProps[prop]);
        }
      }
    }
    return esteElmt;
  }

  function _div(props = {}, ...nodulo) {
    return NReact("div", props, nodulo);
  }
  function divC() {
    return _div({ className: "d-flex flex-column gap-2 bg-body-tertiary p-3 rounded-4 bg-opacity-50" });
  }
  function _input(props = {}, ...nodulo) {
    return NReact("input", props, nodulo);
  }
  function _select(props = {}, ...nodulo) {
    return NReact("select", props, nodulo);
  }
  function _button(props = {}, ...nodulo) {
    return NReact("button", props, nodulo);
  }
  function buttonRM(...f) {
    return _button(
      {
        className: "btn btn-danger btn-sm",
        type: "button",
        onclick: (ev) => ev.target.closest(".rm").remove()
      },
      "×"
    );
  }
  function _form(props = {}, ...nodulo) {
    return NReact("form", props, nodulo);
  }
  function _meta(props = {}, ...nodulo) {
    return NReact("meta", props, nodulo);
  }
  function _link(props = {}, ...nodulo) {
    return NReact("link", props, nodulo);
  }
  function _label(props = {}, ...nodulo) {
    return NReact("label", props, nodulo);
  }

  function label(ttl, ...f) {
    return _label(
      {
        className: "col-auto"
      },
      _div({
        className: "form-label"
      },
        ttl
      ),
      ...f
    )
  }

  function _option(props = {}, ...nodulo) {
    return NReact("option", props, nodulo);
  }
  function _img(props = {}, ...nodulo) {
    return NReact("img", props, nodulo);
  }

  function aplicarNovoManifesto(url) {
    const linkManifest = document.querySelector("link[rel*=manifest]") ??
      document.head.appendChild(
        (function () {
          const elm = document.createElement("link");
          elm.rel = "manifest";
          return elm;
        })()
      );
    linkManifest.href = url;
  }
  document.head.append(
    _meta({
      name: "viewport", content: "width=device-width, initial-scale=1, interactive-widget=resizes-content, user-scalable=no"
    }),
    _link({
      href: "https://valeriohasman.github.io/CriarWebAppPWA/stl.css", rel: "stylesheet"
    }),
    _link({
      href: "/stl.css", rel: "stylesheet"
    })
  );
  document.body.replaceChildren();
  document.body.append(
    _div({
      className: "d-flex vh-100 bg-body-tertiary overflow-y-auto"
    },
      _div({
        className: "col m-auto p-4 mw-100"
      },
        _form({
          className: "d-flex bg-body m-auto rounded-4 flex-wrap flex-column gap-3 p-4 shadow",
          onsubmit: gerarManifest,
          style: {
            maxWidth: "512px"
          }
        },
          label(
            "Nome do app:",
            _input({
              className: "form-control", name: "name", required: true
            })
          ),
          label(
            "Instalar:",
            _select({
              className: "form-select", name: "display", required: true
            },
              _option({
                value: "", hidden: true
              }),
              new Option("Em tela cheia (Jogos)", "fullscreen"),
              new Option("Como um App", "standalone"),
              new Option("Com controles de navegação", "minimal-ui"),
              new Option("Como Link de navegador", "browser"),
            )
          ),

          listaDeIcones(),
          listaDeShortcuts(),

          _button(
            {
              className: "btn btn-primary", type: "submit",
              onclick: function () {
                this.form.dispatchEvent(new Event("change"))
              }
            },
            "Instalar"
          )

        )
      )
    )
  );
  window.addEventListener(
    "beforeinstallprompt",
    function (ev) {
      ev.preventDefault();
      ev.prompt();
    }
  );
  function listaDeIcones() {
    return execute(
      divC(),
      iconesPreExistentes,
      (divTable) => adicionarNovos(
        "Ícones",
        divTable,
        (dataImage) => divTable.append(
          linha(dataImage)
        )
      )
    )
  }
  function shortcut(dataImage) {
    return _div(
      { className: "sc rm d-flex gap-1 border-bottom pb-1" },
      _div(
        { className: "col" },
        _img(
          {
            className: "mw-100",
            src: dataImage.src,
            dataset: {
              ...dataImage,
              size: `${dataImage.width}x${dataImage.height}`
            },
          },
        ),
      ),
      _div(
        { className: "col-10 d-flex flex-wrap gap-1" },
        _div(
          { className: "col" },
          _input(
            {
              className: "form-control form-control-sm",
              placeholder: "Nome",
              name: "sc_name",
              required: true
            }
          ),
        ),
        _div({ className: "col-auto" }, buttonRM()),
        _div(
          { className: "col-12" },
          _input(
            {
              className: "form-control form-control-sm",
              placeholder: "Inicia/em",
              required: true,
              name: "sc_url",
            }
          )
        )
      ),
    )
  }
  function listaDeShortcuts() {

    const container = divC();

    adicionarNovos(
      "Atalhos",
      container,
      (dataImage) => {
        container.append(
          shortcut(dataImage)
        );
      }
    );

    return container;
  }
  function gerarManifest(ev) {
    ev.preventDefault();
    const form = ev.target;
    const name = form.querySelector('[name="name"]').value;
    const start_url = location.origin + "/";
    const display = form.querySelector('[name="display"]').value;
    const linhas = Array.from(form.querySelectorAll(".icone"));
    const shortcuts = Array.from(form.querySelectorAll(".sc"));
    const manifesto = {
      name,
      start_url,
      display,
      icons: [
        ...linhas.flatMap(linha => {
          const src = linha.querySelector("img").src;
          const sizes = linha.querySelector(".size").innerText;
          const type = linha.querySelector(".type").innerText;
          const checkbox = linha.querySelector("input").checked;
          const any = {
            src,
            sizes,
            type,
            purpose: "any",
          };
          return !checkbox ? [any] :
            [
              any,
              {
                src,
                sizes,
                type,
                purpose: "maskable",
              }
            ]
        })
      ],
      shortcuts: shortcuts.map(
        sc => {
          const img = sc.querySelector('img');
          return {
            name: sc.querySelector('[name="sc_name"]').value,
            description: sc.querySelector('[name="sc_name"]').value,
            icons: [
              {
                src: img.src,
                sizes: img.dataset.size,
                type: img.dataset.type
              }
            ],
            url: location.origin + "/" + sc.querySelector('[name="sc_url"]').value
          }
        }
      )
    };
    aplicarNovoManifesto(
      `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifesto))}`
    );
  }
  function adicionarNovos(ttl, divTable, callBack) {
    divTable.append(
      label(
        ttl,
        _input({
          className: "form-control form-control-sm", type: "file", accept: "image/*",
          onchange: function () {
            if (this.files[0])
              obterInfoImagem(
                URL.createObjectURL(
                  this.files[0]
                )
              ).then(callBack);
            this.value = "";
          }
        })
      )
    )
  }
  function iconesPreExistentes(tbody) {
    for (const h of Array.from(document.querySelectorAll('link[rel*="icon"]')).map(l => l.href)) {
      obterInfoImagem(h)
        .then(di => {
          tbody.append(
            linha(di)
          );
        })
    }
  }
  function linha(imagem) {
    const div = _div({ className: "d-flex gap-3 icone rm align-items-center flex-wrap border-bottom pb-1" });
    div.append(
      _img({
        src: imagem.src, style: {
          width: "1.5rem", height: "1.5rem"
        }
      }),
      _div(
        { className: "type" },
        imagem.type
      ),
      _div(
        { className: "size" },
        imagem.width,
        "x",
        imagem.height
      ),
      _input({
        className: "form-check-input", type: "checkbox"
      }),
      buttonRM()
    );
    return div;
  }
  async function obterInfoImagem(url) {
    const resp = await fetch(url);
    return {
      ...await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({
          width: img.width,
          height: img.height
        });
        img.src = url;
      }),
      src: url,
      type: resp.headers.get("Content-Type") || ""
    };
  }
})();