(function () {
  "use strict";

  var chave = "flynex-tema";
  var escuro = false;

  try {
    var salvo = localStorage.getItem(chave);
    escuro = salvo
      ? salvo === "escuro"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (erro) {
    escuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function aplicarTema(novoTema) {
    escuro = novoTema === "escuro";
    document.documentElement.dataset.tema = escuro ? "escuro" : "claro";

    try {
      localStorage.setItem(chave, escuro ? "escuro" : "claro");
    } catch (erro) {
      // O tema continua funcionando mesmo se o navegador bloquear o armazenamento.
    }
  }

  aplicarTema(escuro ? "escuro" : "claro");

  document.addEventListener("DOMContentLoaded", function () {
    var menu = document.getElementById("menu");
    if (!menu) return;

    var botao = document.createElement("button");
    botao.type = "button";
    botao.className = "tema-btn";
    botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
    botao.setAttribute("aria-pressed", String(escuro));

    function atualizarBotao() {
      botao.textContent = escuro ? "☼" : "☾";
      botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
      botao.setAttribute("aria-pressed", String(escuro));
    }

    botao.addEventListener("click", function () {
      aplicarTema(escuro ? "claro" : "escuro");
      atualizarBotao();
    });

    atualizarBotao();
    menu.appendChild(botao);
  });
})();
