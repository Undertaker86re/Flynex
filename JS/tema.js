(function () {
  var chave = "flynex-tema";
  var salvo = localStorage.getItem(chave);
  var escuro = salvo
    ? salvo === "escuro"
    : matchMedia("(prefers-color-scheme: dark)").matches;

  document.documentElement.dataset.tema = escuro ? "escuro" : "claro";

  document.addEventListener("DOMContentLoaded", function () {
    var menu = document.getElementById("menu");
    if (!menu) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tema-btn";
    btn.innerHTML = escuro
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    menu.appendChild(btn);

    btn.onclick = function () {
      var novo =
        document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
      document.documentElement.dataset.tema = novo;
      localStorage.setItem(chave, novo);
      btn.innerHTML =
        novo === "escuro"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    };
  });
})();
