/**
 * @param {string} titulo
 * @param {()=>void} acao
 * @param {string} mensagemBotao
 * @param {"primary"|"secondary"|"success"|"danger"|"warning"|"info"} cor
 */
export default function Notificacao(titulo, acao, mensagemBotao, cor = "primary") {
  const caixaMSG = new DOMParser().parseFromString(`
    <div class="toast" role="alert" data-bs-delay="30000" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">${titulo}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <button acao type="button" class="btn btn-${cor}">${mensagemBotao}</button>
      </div>
    </div>`,
    "text/html").querySelector("div");
  ToastContainer().appendChild(caixaMSG);

  const botao = caixaMSG.querySelector("button[acao]");
  botao.addEventListener("click", acao);
  
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(caixaMSG);
  caixaMSG.addEventListener("shown.bs.toast", () => { botao.focus(); });
  toastBootstrap.show();

  return toastBootstrap;
}

function ToastContainer() {
  return document.querySelector(".toast-container") ?? (() => {
    const tc = document.createElement("div");
    tc.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");
    document.body.appendChild(tc);
    return tc;
  })();
}