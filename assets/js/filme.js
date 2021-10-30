let filme;
let eFilme;

function carregarFilme() {
  const searchParams = new URLSearchParams(window.location.search);
  const filmeId = searchParams.get("id");

  filme = filmes.filter((el) => el.id === Number(filmeId))[0];

  if (!filme) window.location.href = "filmes.html";
}

function montarFilme() {
  const blocoFilme = $(".filme-background").css(
    "background-image",
    `url(${filme.imagem})`
  );

  eFilme = !filme.temporadas || !filme.temporadas.length;

  $(".filme-background .filme-none").text(filme.nome);
  $(".filme-background .filme-resumo").text(filme.descricao);
  $(".filme-itens li:nth-of-type(1)").text(
    filme.ano_lancamento || filme.temporadas.slice(-1)[0].ano_lancamento
  );
  $(".filme-itens li:nth-of-type(2) span").text(filme.etaria);
  if (eFilme) $(".filme-itens li:nth-of-type(3)").remove();
  else
    $(".filme-itens li:nth-of-type(3)").text(
      `${filme.temporadas.length} Temporada${
        filme.temporadas.length > 1 ? "s" : ""
      }`
    );

  $(".filme-itens li:nth-of-type(4)").text(filme.categorias[0]);
  $(".filme-resumo").text(filme.descricao);
  const destaque = $(".filme-estrela span").clone();
  $(".filme-estrela")
    .text(` ${filme.infos.estrelando.join(", ")}`)
    .prepend(destaque);
  const destaqueCriacao = $(".filme-realizacao span").clone();
  $(".filme-realizacao")
    .text(` ${filme.infos.criacao.join(", ")}`)
    .prepend(destaqueCriacao);

  const perfilSalvo = JSON.parse(localStorage.getItem("perfil"));
  const adicionado = perfilSalvo.favoritos.filter(
    (el) => el === filme.id
  ).length;

  if (adicionado) {
    $(".js-adicionar span").removeClass("mdi-plus").addClass("mdi-minus");
    $(".js-adicionar").removeClass("btn-outline-light").addClass("btn-light");
    $(".js-adicionar").attr("data-adicionado", adicionado);
  }

  perfilSalvo.likes = perfilSalvo.likes || [];
  perfilSalvo.deslikes = perfilSalvo.deslikes || [];

  const temLike = perfilSalvo.likes.filter((el) => el === filme.id);
  const temDeslike = perfilSalvo.deslikes.filter((el) => el === filme.id);

  if (temLike.length) {
    $(".js-deslike").addClass("d-none");
    $(".js-like span")
      .removeClass("mdi-thumb-up-outline")
      .addClass("mdi-thumb-up");
  } else if (temDeslike.length) {
    $(".js-like").addClass("d-none");
    $(".js-deslike span")
      .removeClass("mdi-thumb-down-outline")
      .addClass("mdi-thumb-down");
  }

  $(".js-adicionar").on("click", adicionarMinhaLista);
  $(".js-like, .js-deslike").on("click", likeDeslikeFilme);

  let url = `ver.html?filme=${filme.id}`;
  if (eFilme) url += `&nome=${filme.nome}`;
  else {
    const temporada_atual = filme.temporadas.filter(
      (el) => el.temporada === 1
    )[0];
    url += `&ep=${temporada_atual.episodios[0].id}`;
  }
  $(".js-ver").attr("href", url);

  blocoFilme.removeClass("d-none");
}

function montarEpisodios() {
  if (!filme.temporadas) return;

  const template_conteudo = $("template#baseFilmeEpisodios");

  const conteudo = $(template_conteudo.prop("content")).clone();

  filme.temporadas.forEach((temporada) => {
    const item = $("<option></option>")
      .attr("value", temporada.temporada)
      .text(`${temporada.temporada}ª Temporada`);
    conteudo.find("select optgroup").append(item);
  });

  conteudo.find(".select-temporadas").on("change", mudarTemporada);

  conteudo.appendTo(template_conteudo.parent());

  listarEpisodios(1);
}

function mudarTemporada(event) {
  const temporada = Number(event.currentTarget.value);

  $(".bloco-serie-temporadas .listagem-filmes-item").remove();
  listarEpisodios(temporada);
}

function listarEpisodios(temporada) {
  const temporada_atual = filme.temporadas.filter(
    (el) => el.temporada === temporada
  );

  $(".bloco-serie-temporadas .serie-lancamento-info span").text(
    temporada_atual[0].ano_lancamento
  );

  const videos = temporada_atual.reduce((total, atual) => {
    total.push(...atual.episodios);
    return total;
  }, []);

  const item_template = $(
    $(".bloco-serie-temporadas .listagem-filmes template").prop("content")
  );

  videos.forEach((video) => {
    const item = item_template.clone();
    item
      .find("a")
      .attr(
        "href",
        `ver.html?filme=${filme.id}&ep=${video.id}&nome=${video.nome}`
      );
    item.find("img").attr("src", video.miniatura);
    item.find(".listagem-filmes-nome strong").text(video.nome);
    item.find(".listagem-filmes-minutos").html(`${video.tempo} <br /> min`);
    item.find(".listagem-filmes-descricao").text(video.descricao);
    $(item[0].cloneNode(true)).appendTo(
      ".bloco-serie-temporadas .listagem-filmes"
    );
  });
}

function montarVideos() {
  if (!filme.videos) return;

  const template_conteudo = $("template#baseFilmeVideos");

  const conteudo = $(template_conteudo.prop("content")).clone();

  filme.videos.forEach((video) => {
    const item_template = conteudo.find("template");

    const item = $(item_template.prop("content"))
      .find(".listagem-filmes-item")
      .clone();
    item.find("img").attr("src", video.miniatura);
    item.find("p strong").text(video.nome);
    $(item[0].cloneNode(true)).appendTo(conteudo.find("ul.listagem-filmes"));
  });

  conteudo.appendTo(template_conteudo.parent());
}

function adicionarMinhaLista(event) {
  const adicionado = Number(event.currentTarget.dataset.adicionado);
  const perfilSalvo = JSON.parse(localStorage.getItem("perfil"));
  const perfil = perfis.filter((el) => el.id === perfilSalvo.id)[0];

  if (adicionado) {
    perfil.favoritos = perfil.favoritos.filter((el) => el !== filme.id);
    $(".js-adicionar span").removeClass("mdi-minus").addClass("mdi-plus");
    $(".js-adicionar").removeClass("btn-light").addClass("btn-outline-light");
  } else {
    perfil.favoritos.push(filme.id);
    $(".js-adicionar span").removeClass("mdi-plus").addClass("mdi-minus");
    $(".js-adicionar").removeClass("btn-outline-light").addClass("btn-light");
  }

  event.currentTarget.dataset.adicionado = Number(!adicionado);

  localStorage.setItem("perfis", JSON.stringify(perfis));
  localStorage.setItem("perfil", JSON.stringify(perfil));
}

function likeDeslikeFilme(event) {
  const perfilSalvo = JSON.parse(localStorage.getItem("perfil"));
  const perfil = perfis.filter((el) => el.id === perfilSalvo.id)[0];
  const like = event.currentTarget.classList.contains("js-like");

  const likeElemento = $(".js-like");
  const deslikeElemento = $(".js-deslike");

  if (like) {
    const removerLike = deslikeElemento.hasClass("d-none");
    perfil.likes = perfil.likes || [];

    if (removerLike) {
      perfil.likes = perfil.likes.filter((el) => el !== filme.id);
      deslikeElemento.removeClass("d-none");
      likeElemento
        .children()
        .removeClass("mdi-thumb-up")
        .addClass("mdi-thumb-up-outline");
    } else {
      perfil.likes.push(filme.id);
      deslikeElemento.addClass("d-none");
      likeElemento
        .children()
        .removeClass("mdi-thumb-up-outline")
        .addClass("mdi-thumb-up");
    }
  } else {
    const removerDeslike = likeElemento.hasClass("d-none");
    perfil.deslikes = perfil.deslikes || [];
    if (removerDeslike) {
      perfil.deslikes = perfil.deslikes.filter((el) => el !== filme.id);
      likeElemento.removeClass("d-none");
      deslikeElemento
        .children()
        .removeClass("mdi-thumb-down")
        .addClass("mdi-thumb-down-outline");
    } else {
      perfil.deslikes.push(filme.id);
      likeElemento.addClass("d-none");
      deslikeElemento
        .children()
        .removeClass("mdi-thumb-down-outline")
        .addClass("mdi-thumb-down");
    }
  }

  localStorage.setItem("perfis", JSON.stringify(perfis));
  localStorage.setItem("perfil", JSON.stringify(perfil));
}

$(document).ready(function () {
  montarFilme();
  if (eFilme) montarVideos();
  else montarEpisodios();
});

carregarFilme();
redirecionarLogin(false);
