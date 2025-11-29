# Criador de Web App – PWA

## Como iniciar

Execute o script abaixo na barra de endereços do navegador ou crie um favorito com o seguinte comando:

### Novo 2025

Completo e muito mais compatível, sem problema de cors

```javascript
javascript:!function(){"use strict";function e(e,...t){for(const n of t)n(e);return e}function t(e,t={},o=[]){const r=document.createElement(e);return r.append(...o),r.a=n,r.a(t),r}function n(e,t,o){const r=this??t;for(const t in e)if("function"==typeof r[t]||"object"!=typeof e[t]||e[t]instanceof Node)if("function"==typeof r[t]&&Array.isArray(e[t]))r[t](...e[t]);else try{r[t]=e[t]}catch(n){r.setAttribute(t,e[t])}else n(e[t],r[t],o??r);return r}function o(e={},...n){return t("div",e,n)}function r(e={},...n){return t("input",e,n)}function a(e={},...n){return t("button",e,n)}function c(e={},...n){return t("label",e,n)}function l(e={},...n){return t("tr",e,n)}function s(e={},...n){return t("td",e,n)}function i(e={},...n){return t("th",e,n)}function u(e){const t=e.querySelector("tbody");e.insertAdjacentElement("afterbegin",r({className:"form-control m-2",type:"file",accept:"image/*",onchange:function(){this.files[0]&&t.append(f(URL.createObjectURL(this.files[0]))),this.value=""}}))}function m(e){const t=Array.from(document.querySelectorAll('link[rel*="icon"]')).map((e=>e.href));e.append(...t.map((e=>f(e))))}function f(n){return e(l(),(async e=>{const o=await async function(e){const t=await fetch(e);return{...await new Promise((t=>{const n=new Image;n.onload=()=>t({width:n.width,height:n.height}),n.src=e})),type:t.headers.get("Content-Type")||""}}(n);e.append(s({},function(e={},...n){return t("img",e,n)}({src:n,style:{width:"1.5rem",height:"1.5rem"}})),s({},o.type),s({},o.width,"x",o.height),s({},c({className:"form-check form-switch"},r({className:"form-check-input",type:"checkbox",role:"switch"}))),s({},a({className:"btn btn-danger",type:"button",onclick:function(){this.closest("tr").remove()}},"×")))}))}document.head.append(function(e={},...n){return t("meta",e,n)}({name:"viewport",content:"width=device-width, initial-scale=1, interactive-widget=resizes-content, user-scalable=no"}),function(e={},...n){return t("link",e,n)}({href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css",rel:"stylesheet"})),document.body.replaceChildren(),document.body.append(o({className:"d-flex vh-100 bg-body-tertiary overflow-y-auto"},o({className:"col m-auto p-4 mw-100"},function(e={},...n){return t("form",e,n)}({className:"d-flex bg-body m-auto rounded-4 flex-wrap flex-column gap-4 p-4 shadow",onsubmit:function(e){e.preventDefault();const t=e.target,n=t.querySelector('[name="name"]').value,o=location.origin+"/"+t.querySelector('input[name="start_url"]').value,r=t.querySelector('[name="background_color"]').value,a=t.querySelector('[name="display"]').value,c=Array.from(t.querySelectorAll("tbody tr")),l={name:n,start_url:o,background_color:r,display:a,icons:[...c.flatMap((e=>{const t=e.querySelector("img").src,n=e.querySelector("td:nth-child(3)").innerText,o=e.querySelector("td:nth-child(2)").innerText,r={src:t,sizes:n,type:o,purpose:"any"};return e.querySelector("input").checked?[r,{src:t,sizes:n,type:o,purpose:"maskable"}]:[r]}))]};s=URL.createObjectURL(new Blob([JSON.stringify(l)],{type:"application/json"})),(document.querySelector("link[rel*=manifest]")??document.head.appendChild(function(){const e=document.createElement("link");return e.rel="manifest",e}())).href=s;var s},style:{maxWidth:"512px"}},c({className:"col-auto"},o({className:"form-label"},"Nome do app:"),r({className:"form-control",name:"name",required:!0})),c({className:"col-auto mw-100"},o({className:"form-label"},"Iniciar em:"),o({className:"input-group"},o({className:"input-group-text overflow-auto"},location.host+"/"),r({className:"form-control",name:"start_url",style:{width:"fit-content"},placeholder:"index.html"}))),c({className:"col-auto"},o({className:"form-label"},"Cor do tema:"),e(o({className:"input-group"}),(e=>{const t=r({className:"form-control form-control-color p-1",name:"background_color",type:"color",value:"#ffffff",oninput:()=>{n.value=t.value}}),n=r({className:"form-control font-monospace flex-grow-0",style:{width:"6rem"},maxLength:7,value:"#ffffff",oninput:()=>{t.value=n.value}});e.append(t,n)}))),c({className:"col-auto"},o({className:"form-label"},"Instalar:"),function(e={},...n){return t("select",e,n)}({className:"form-select",name:"display",required:!0},function(e={},...n){return t("option",e,n)}({value:"",hidden:!0}),new Option("Tela cheia","fullscreen"),new Option("Como App","standalone"),new Option("Controles de navegação","minimal-ui"),new Option("Link de navegador","browser"))),e(o({className:"table-responsive mw-100"},function(e={},...n){return t("table",e,n)}({className:"table table-bordered table-sm align-middle"},function(e={},...n){return t("thead",e,n)}({},l({},i({},"Ícones"),i({},"Tipo"),i({},"Dimensões"),i({},"Mascarável"),i({},""))),e(function(e={},...n){return t("tbody",e,n)}({}),m))),u),a({className:"btn btn-primary",type:"submit",onclick:function(){this.form.dispatchEvent(new Event("change"))}},"Instalar"))))),window.addEventListener("beforeinstallprompt",(function(e){e.preventDefault(),e.prompt()}))}();
```

### Antigo 2

```javascript
javascript:( function () { import("https://valeriohasman.github.io/CriarWebAppPWA/instalar.js") })();
```

### Antigo
Execute o script abaixo na barra de endereços do navegador ou crie um favorito com o seguinte comando:

```javascript
javascript:(function () { var script = document.createElement('script'); script.src="https://valeriohasman.github.io/CriarWebAppPWA/CriarManifest.js"; document.body.append(script); })();
```

Vá para o site que deseja criar um Web App e execute o script.

Logo a seguir aparecerá janelas de diálogo que podem ser preenchidas.

Ao terminar, a página tornar-se-á instalável 🙂.

## ⚠️ Atenção
* Ao copiar e colar o script na barra de endereços, certifique-se de que o termo `javascript:` não desapareceu por causa do método de segurança.
* Se por acaso não funciona, certamente foi por causa de ele não ter encontrado imagens automaticamente, portanto tente novamente sem o modo automático.
* Caso nem a primeira modal de diálogo apareça, saiba que existe sites que não aceitam esse tipo de script por causa de métodos de segurança.
