export default `
  <section>
    <style>
      section {
        user-select: none;
        width: 90%;
        margin-right: auto;
        margin-left: auto;
      }

      @media (min-width: 576px) {
        section {
          width: 75%;
        }
      }

      h1 {
        margin-top: 3em;
        margin-bottom: 0.2rem;
        animation: fim 0.1s 7.5s linear forwards;
      }

      [role=progressbar]>div {
        background-color: currentColor;
        height: 1px;
        animation: progress 7s ease-out forwards;
      }

      .corsErr {
        opacity: 0;
        transform: translateY(25vh);
        animation: cors 0.5s 8s ease-in-out forwards;
      }

      @keyframes progress {
        from {
          width: 0%;
        }

        to {
          width: 100%;
        }
      }

      @keyframes cors {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fim {
        to {
          opacity: 0;
        }
      }

    </style>
    <h1>Aguarde…</h1>
    <div role="progressbar">
      <div></div>
    </div>
    <div class="corsErr">
      <p>Hum… Pode ter ocorrido um problema de <code>CORS</code>, o site possivelmente não permite <code>scripts</code>
        externos.</p>
      <button type="button" onclick="window.location.reload();">↻ Voltar ao site</button>
    </div>
  </section>`