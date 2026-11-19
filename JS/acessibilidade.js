var CHAVE = "flynex-acessibilidade";
var OPCOES = [
  ["contraste", "Alto contraste", "fa-circle-half-stroke"],
  ["cinza", "Tons de cinza", "fa-droplet"],
  ["fonte", "Fonte legível", "fa-font"],
  ["linhas", "Espaço entre linhas", "fa-align-left"],
  ["letras", "Espaço entre letras", "fa-text-width"],
  ["links", "Destacar links", "fa-link"],
  ["animacoes", "Parar animações", "fa-pause"],
  ["cursor", "Cursor grande", "fa-arrow-pointer"],
];

var config = { tamanho: 0 };
OPCOES.forEach(function (o) {
  config[o[0]] = false;
});

try {
  var salvo = JSON.parse(localStorage.getItem(CHAVE));
  if (salvo) {
    config.tamanho = salvo.tamanho || 0;
    OPCOES.forEach(function (o) {
      if (salvo[o[0]]) config[o[0]] = true;
    });
  }
} catch (e) {}

var html = document.documentElement;
var painel, botaoAbrir, aviso, visor;

function aplicar() {
  for (var n = 0; n <= 4; n++) html.classList.remove("a11y-tam-" + n);
  html.classList.add("a11y-tam-" + config.tamanho);
  OPCOES.forEach(function (o) {
    html.classList.toggle("a11y-" + o[0], config[o[0]]);
  });
  atualizar();
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(config));
  } catch (e) {}
}

function porcentagem() {
  return [100, 110, 125, 140, 160][config.tamanho] + "%";
}

aplicar();

document.addEventListener("DOMContentLoaded", function () {
  var main = document.querySelector("main");
  if (main && !main.id) main.id = "conteudo";

  var raiz = document.createElement("div");
  raiz.className = "a11y-raiz";

  var botoes = "";
  OPCOES.forEach(function (o) {
    botoes +=
      '<button type="button" class="a11y-opcao" data-chave="' +
      o[0] +
      '" aria-pressed="false">' +
      '<i class="fas ' +
      o[2] +
      '"></i><span>' +
      o[1] +
      "</span></button>";
  });

  raiz.innerHTML =
    '<button type="button" class="a11y-abrir" aria-expanded="false" aria-controls="a11y-painel" aria-label="Acessibilidade">' +
    '<i class="fas fa-universal-access"></i></button>' +
    '<section class="a11y-painel" id="a11y-painel" role="dialog" aria-labelledby="a11y-titulo" hidden tabindex="-1">' +
    '<div class="a11y-topo"><h2 id="a11y-titulo">Acessibilidade</h2>' +
    '<button type="button" class="a11y-fechar" aria-label="Fechar"><i class="fas fa-xmark"></i></button></div>' +
    '<div class="a11y-corpo">' +
    '<div class="a11y-tamanho"><span class="a11y-rotulo">Tamanho do texto</span>' +
    '<div class="a11y-tamanho-botoes">' +
    '<button type="button" class="a11y-menos" aria-label="Diminuir">A−</button>' +
    '<output class="a11y-visor">100%</output>' +
    '<button type="button" class="a11y-mais" aria-label="Aumentar">A+</button>' +
    "</div></div>" +
    '<div class="a11y-grade">' +
    botoes +
    "</div>" +
    '<button type="button" class="a11y-reset"><i class="fas fa-rotate-left"></i> Restaurar padrão</button>' +
    '<p class="a11y-aviso" role="status" aria-live="polite"></p>' +
    "</div></section>";

  document.body.appendChild(raiz);

  painel = raiz.querySelector(".a11y-painel");
  botaoAbrir = raiz.querySelector(".a11y-abrir");
  aviso = raiz.querySelector(".a11y-aviso");
  visor = raiz.querySelector(".a11y-visor");

  botaoAbrir.onclick = function () {
    painel.hidden ? abrir() : fechar();
  };
  raiz.querySelector(".a11y-fechar").onclick = fechar;

  raiz.querySelector(".a11y-mais").onclick = function () {
    mudarTamanho(1);
  };
  raiz.querySelector(".a11y-menos").onclick = function () {
    mudarTamanho(-1);
  };

  raiz.querySelectorAll(".a11y-opcao").forEach(function (b) {
    b.onclick = function () {
      alternar(b.dataset.chave);
    };
  });

  raiz.querySelector(".a11y-reset").onclick = restaurar;

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !painel.hidden) {
      fechar();
      botaoAbrir.focus();
    }
  });
  document.addEventListener("click", function (e) {
    if (!painel.hidden && !raiz.contains(e.target)) fechar();
  });

  aplicar();
});

function abrir() {
  painel.hidden = false;
  botaoAbrir.setAttribute("aria-expanded", "true");
  painel.focus();
}

function fechar() {
  painel.hidden = true;
  botaoAbrir.setAttribute("aria-expanded", "false");
}

function mudarTamanho(passo) {
  var novo = config.tamanho + passo;
  if (novo < 0 || novo > 4) return;
  config.tamanho = novo;
  salvar();
  aplicar();
}

function alternar(chave) {
  config[chave] = !config[chave];
  salvar();
  aplicar();
  aviso.textContent = "";
}

function restaurar() {
  config.tamanho = 0;
  OPCOES.forEach(function (o) {
    config[o[0]] = false;
  });
  salvar();
  aplicar();
}

function atualizar() {
  if (!painel) return;
  painel.querySelectorAll(".a11y-opcao").forEach(function (b) {
    b.setAttribute("aria-pressed", config[b.dataset.chave] ? "true" : "false");
  });
  if (visor) visor.textContent = porcentagem();
}
