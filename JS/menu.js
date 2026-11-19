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
