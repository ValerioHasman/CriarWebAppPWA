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
  function _input(props = {}, ...nodulo) {
    return NReact("input", props, nodulo);
  }
  function _select(props = {}, ...nodulo) {
    return NReact("select", props, nodulo);
  }
  function _button(props = {}, ...nodulo) {
    return NReact("button", props, nodulo);
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
  function _option(props = {}, ...nodulo) {
    return NReact("option", props, nodulo);
  }
  function _tr(props = {}, ...nodulo) {
    return NReact("tr", props, nodulo);
  }
  function _td(props = {}, ...nodulo) {
    return NReact("td", props, nodulo);
  }
  function _th(props = {}, ...nodulo) {
    return NReact("th", props, nodulo);
  }
  function _table(props = {}, ...nodulo) {
    return NReact("table", props, nodulo);
  }
  function _thead(props = {}, ...nodulo) {
    return NReact("thead", props, nodulo);
  }
  function _tbody(props = {}, ...nodulo) {
    return NReact("tbody", props, nodulo);
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
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css", rel: "stylesheet"
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
          className: "d-flex bg-body m-auto rounded-4 flex-wrap flex-column gap-4 p-4 shadow",
          onsubmit: gerarManifest,
          style: {
            maxWidth: "512px"
          }
        },
          _label({
            className: "col-auto"
          },
            _div({
              className: "form-label"
            },
              "Nome do app:"
            ),
            _input({
              className: "form-control", name: "name", required: true
            })
          ),
          _label({
            className: "col-auto mw-100"
          },
            _div({
              className: "form-label"
            },
              "Iniciar em:"
            ),
            _div({
              className: "input-group"
            },
              _div({
                className: "input-group-text overflow-auto"
              },
                location.host + "/"
              ),
              _input({
                className:
                  "form-control",
                name: "start_url",
                style: {
                  width: "fit-content"
                },
                placeholder: "index.html"
              })
            ),
          ),
          _label({
            className: "col-auto"
          },
            _div({
              className: "form-label"
            },
              "Tema:"
            ),
            execute(
              _div({
                className: "input-group"
              }),
              (div) => {
                const cor1 = _input({
                  className: "form-control form-control-color p-1",
                  name: "theme_color",
                  type: "color",
                  value: "#ffffff",
                  oninput: () => {
                    cor2.value = cor1.value;
                  }
                });
                const cor2 = _input({
                  className: "form-control font-monospace flex-grow-0",
                  style: {
                    width: "6rem"
                  },
                  maxLength: 7,
                  value: "#ffffff",
                  oninput: () => {
                    cor1.value = cor2.value;
                  }
                });
                div.append(
                  cor1,
                  cor2
                );
              }
            )
          ),
          _label({
            className: "col-auto"
          },
            _div({
              className: "form-label"
            },
              "Instalar:"
            ),
            _select({
              className: "form-select", name: "display", required: true
            },
              _option({
                value: "", hidden: true
              }),
              new Option("Tela cheia", "fullscreen"),
              new Option("Como App", "standalone"),
              new Option("Controles de navegação", "minimal-ui"),
              new Option("Link de navegador", "browser"),
            )
          ),
          listaDeIcones(),

          _button({
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
      _div({
        className: "table-responsive mw-100"
      },
        _table({
          className: "table table-bordered table-sm align-middle"
        },
          _thead({},
            _tr({},
              _th({}, "Ícones"),
              _th({}, "Tipo"),
              _th({}, "Dimensões"),
              _th({}, "Mascarável"),
              _th({}, ""),
            )
          ),
          execute(
            _tbody({}),
            iconesPreExistentes,
          )
        )
      ),
      adicionarNovos
    );
  }
  function gerarManifest(ev) {
    ev.preventDefault();
    const form = ev.target;
    const name = form.querySelector('[name="name"]').value;
    const start_url = location.origin + "/" + form.querySelector('input[name="start_url"]').value;
    const background_color = form.querySelector('[name="theme_color"]').value;
    const theme_color = background_color
    const display = form.querySelector('[name="display"]').value;
    const linhas = Array.from(form.querySelectorAll("tbody tr"));
    const manifesto = {
      name,
      start_url,
      background_color,
      theme_color,
      display,
      icons: [
        ...linhas.flatMap(linha => {
          const src = linha.querySelector("img").src;
          const sizes = linha.querySelector("td:nth-child(3)").innerText;
          const type = linha.querySelector("td:nth-child(2)").innerText;
          const checkbox = linha.querySelector("input").checked;
          const any = {
            src,
            sizes,
            type,
            purpose: "any",
          };
          return !checkbox ? [any] :
            [any,
              {
                src,
                sizes,
                type,
                purpose: "maskable",
              }]
        })
      ]
    };
    aplicarNovoManifesto(
      URL.createObjectURL(
        new Blob([
          JSON.stringify(
            manifesto
          )
        ], {
          type: "application/json"
        })
      )
    );
  }
  function adicionarNovos(divTable) {
    const tbody = divTable.querySelector("tbody");
    divTable.insertAdjacentElement("afterbegin",

      _input({
        className: "form-control m-2", type: "file", accept: "image/*",
        onchange: function () {
          if (this.files[0])
            tbody.append(
              linha(
                URL.createObjectURL(
                  this.files[0]
                )
              )
            );
          this.value = "";
        }
      })

    )
  }
  function iconesPreExistentes(tbody) {
    const hrefs = Array.from(document.querySelectorAll('link[rel*="icon"]')).map(l => l.href);
    tbody.append(
      ...hrefs.map(href => linha(href,
      ))
    );
  }
  function linha(icone) {
    return execute(
      _tr(),
      async (tr) => {
        const imagem = await obterInfoImagem(icone);
        tr.append(
          _td({},
            _img({
              src: icone, style: {
                width: "1.5rem", height: "1.5rem"
              }
            })
          ),
          _td({},
            imagem.type),
          _td({},
            imagem.width,
            "x",
            imagem.height),
          _td({},
            _label({
              className: "form-check form-switch"
            },
              _input({
                className: "form-check-input", type: "checkbox", role: "switch"
              })

            )
          ),
          _td({},
            _button({
              className: "btn btn-danger", type: "button",
              onclick: function () {
                this.closest("tr").remove();
              }
            }, "×")
          )
        )
      }
    )
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
      type: resp.headers.get("Content-Type") || ""
    };
  }
})();