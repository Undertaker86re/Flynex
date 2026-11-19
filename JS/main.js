var botao = document.getElementById("burger");
var menu = document.getElementById("menu");

if (botao && menu) {
  botao.onclick = function () {
    botao.classList.toggle("open");
    menu.classList.toggle("open");
  };
  menu.querySelectorAll("a").forEach(function (a) {
    a.onclick = function () {
      botao.classList.remove("open");
      menu.classList.remove("open");
    };
  });
}

var cabecalho = document.querySelector("header");
var barra = document.getElementById("progress");
var itens = document.querySelectorAll(".reveal");

function aoRolar() {
  if (cabecalho) {
    cabecalho.classList.toggle("scrolled", window.scrollY > 10);
  }
  if (barra) {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform =
      "scaleX(" + (total > 0 ? window.scrollY / total : 0) + ")";
  }
  mostrarItens();
}

function mostrarItens() {
  var atraso = 0;
  itens.forEach(function (item) {
    if (item.classList.contains("in")) return;
    if (item.getBoundingClientRect().top < window.innerHeight * 0.88) {
      item.style.setProperty("--d", atraso + "ms");
      item.classList.add("in");
      atraso += 90;
    }
  });
}

window.addEventListener("scroll", aoRolar);
window.addEventListener("load", aoRolar);
