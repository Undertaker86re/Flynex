var botao = document.getElementById("burger");
var menu = document.getElementById("menu");

if (botao && menu) {
  botao.setAttribute("aria-expanded", "false");

  botao.addEventListener("click", function () {
    var aberto = botao.classList.toggle("open");
    menu.classList.toggle("open", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      botao.classList.remove("open");
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

var cabecalho = document.querySelector("header");
var barra = document.getElementById("progress");
var itens = document.querySelectorAll(".reveal");
var atualizacaoPendente = false;

function atualizarPagina() {
  if (cabecalho) {
    cabecalho.classList.toggle("scrolled", window.scrollY > 10);
  }

  if (barra) {
    var alturaTotal =
      document.documentElement.scrollHeight - window.innerHeight;
    var progresso = alturaTotal > 0 ? window.scrollY / alturaTotal : 0;
    barra.style.transform = "scaleX(" + Math.min(1, Math.max(0, progresso)) + ")";
  }

  atualizacaoPendente = false;
}

function aoRolar() {
  if (atualizacaoPendente) return;
  atualizacaoPendente = true;
  window.requestAnimationFrame(atualizarPagina);
}

if ("IntersectionObserver" in window) {
  var observador = new IntersectionObserver(
    function (entradas, observer) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in");
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -5% 0px",
      threshold: 0.01
    }
  );

  itens.forEach(function (item) {
    observador.observe(item);
  });
} else {
  itens.forEach(function (item) {
    item.classList.add("in");
  });
}

window.addEventListener("scroll", aoRolar, { passive: true });
window.addEventListener("resize", aoRolar, { passive: true });
window.addEventListener("load", atualizarPagina, { once: true });
atualizarPagina();
