function redirecionarLogin(logicaLogado) {
  // mudar com cookie
  const local = localStorage.getItem("login");
  const session = sessionStorage.getItem("login");

  if (logicaLogado && (local || session)) {
    window.location.href = "perfil.html";
  } else if (!logicaLogado && !local && !session) {
    window.location.href = "index.html";
  }
}

function sair() {
sessionStorage.removeItem('login');
localStorage.removeItem('login');

redirecionarLogin(false);
}

function botoesSair() {
    document.querySelectorAll('.js-btn-sair').forEach((el) => {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            sair();
        });
    });
}

