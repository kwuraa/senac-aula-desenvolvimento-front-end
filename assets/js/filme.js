let filme;

function carregarFilme() {
  const searchParams = new URLSearchParams(window.location.search);
  const filmeId = searchParams.get("id");

  filme = filmes.filter((el) => el.id === Number(filmeId))[0];

  if (!filme) window.location.href = "filmes.html";
}

$(document).ready(function () {
  $(".filme-background").css("background-image", `url(${filme.imagem})`);
});

carregarFilme();
redirecionarLogin(false);
