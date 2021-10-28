var meuPerfil;
var modeloPerfil;

// TRANSFORMAR EM GLOBAIS
const callbackTagName = (base, tagname) => (chave) =>
  base[chave].tagName && base[chave].tagName.toLowerCase() === tagname;

const callbackClassList = function (base, classItem) {
  return function (chave) {
    return base[chave].classList && base[chave].classList.contains(classItem);
  };
};

const encontrarFilho = function (base, funcaoFilter) {
  return Object.keys(base)
    .filter(funcaoFilter)
    .map((chave) => base[chave])[0];
};

const encontrarFilhos = function (base, funcaoFilter) {
  return Object.keys(base)
    .filter(funcaoFilter)
    .map((chave) => base[chave]);
};

function carregarPerfil() {
  meuPerfil = JSON.parse(localStorage.getItem("perfil"));

  const perfilElemento = document.querySelector("#meuPerfil");

  const perfilFigure = encontrarFilho(
    perfilElemento.childNodes,
    callbackTagName(perfilElemento.childNodes, "figure")
  );

  perfilFigure.style.backgroundColor = meuPerfil.fundo;
}
function carregarPerfis() {
  if (!modeloPerfil) {
    const itemBase = document.querySelector("#menuPerfis .menu-perfil-item");
    itemBase.classList.remove("d-none");
    itemBase.remove();
    modeloPerfil = itemBase.cloneNode(true);
  }

  const base = document.querySelector("#menuPerfis");
  const perfilAddElement = document.querySelector(".js-item-base");

  perfis
    .filter((perfil) => perfil.id !== meuPerfil.id)
    .forEach((perfil) => {
      const modeloItem = modeloPerfil.cloneNode(true);
      const itemLink = encontrarFilho(
        modeloItem.childNodes,
        callbackClassList(modeloItem.childNodes, "dropdown-item")
      );
      itemLink.dataset.perfil = perfil.id;
      itemLink.addEventListener("click", selecionarPerfil);
      const itemLinkTexto = encontrarFilho(
        itemLink.childNodes,
        callbackTagName(itemLink.childNodes, "span")
      );
      itemLinkTexto.innerText = perfil.nome;

      const itemFigure = encontrarFilho(
        itemLink.childNodes,
        callbackTagName(itemLink.childNodes, "figure")
      );
      itemFigure.style.backgroundColor = perfil.fundo;

      base.insertBefore(modeloItem, perfilAddElement);
    });
}

function selecionarPerfil(event) {
  const perfilId = event.currentTarget.dataset.perfil;
  const perfil = perfis.filter((el) => el.id === Number(perfilId))[0];

  localStorage.setItem("perfil", JSON.stringify(perfil));

  document
    .querySelectorAll("#menuPerfis .menu-perfil-item .dropdown-item ")
    .forEach((el) => {
      el.removeEventListener("click", function () {});
      el.remove();
    });
  carregarPerfil();
  carregarPerfis();
}

function notificacoes() {
  const novidadesNaoLidas = novidades.filter((el) => !el.visualizado);
  const modelo = document.querySelector("#menuNovidades .menu-item");
  modelo.classList.remove("d-none");
  modelo.remove();

  const base = document.querySelector("#menuNovidades");
  novidadesNaoLidas.forEach((novidade) => {
    const itemModelo = modelo.cloneNode(true);

    const itemLink = encontrarFilho(
      itemModelo.childNodes,
      callbackClassList(itemModelo.childNodes, "dropdown-item")
    );

    const itemImg = encontrarFilho(
      itemLink.childNodes,
      callbackTagName(itemLink.childNodes, "img")
    );
    itemImg.src = novidade.imagem;

    const itemTextos = encontrarFilho(
      itemLink.childNodes,
      callbackClassList(itemLink.childNodes, "bloco-novidades-textos")
    );

    const tipo = document.createElement("p");
    tipo.innerText = novidade.tipo;
    const texto = document.createElement("p");
    texto.innerText = novidade.texto;
    const infos = document.createElement("small");
    infos.innerText = novidade.infos;

    itemTextos.innerHtml = "";
    itemTextos.appendChild(tipo);
    itemTextos.appendChild(texto);
    itemTextos.appendChild(infos);

    base.appendChild(itemModelo);
  });
}

function carregarNovidades() {
  const novidadesNaoLidas = novidades.filter((el) => !el.visualizado);
  const blocoNovidade = document.querySelector("#blocoNovidades");
  const badge = encontrarFilho(
    blocoNovidade.childNodes,
    callbackClassList(blocoNovidade.childNodes, "badge")
  );

  if (!novidadesNaoLidas.length) {
    badge.classList.add("d-none");
  } else {
    badge.classList.remove("d-none");
    const badgeText = encontrarFilho(
      badge.childNodes,
      callbackClassList(badge.childNodes, "novidades-texto")
    );

    badgeText.innerText =
      novidadesNaoLidas.length > 99 ? "99+" : novidadesNaoLidas.length;
  }
}

function visualizarNovidades(event) {
  novidades.forEach((el) => (el.visualizado = true));

  carregarNovidades();
}

function buscarFilmes(event) {
  event.preventDefault();
  const ativo = event.currentTarget.dataset.ativo === "true";

  if (!ativo) {
    event.currentTarget.parentNode.classList.add("ativo");

    event.currentTarget.dataset.ativo = true;
  } else {
    event.currentTarget.parentNode.classList.remove("ativo");
    event.currentTarget.dataset.ativo = false;
  }
}

function carregarSlideFilmes() {
  const categorias = {};
  for (let i = 0; i < filmes.length; i++) {
    for (let j = 0; j < filmes[i].categorias.length; j++) {
      if (!categorias[filmes[i].categorias[j]])
        categorias[filmes[i].categorias[j]] = [];
      categorias[filmes[i].categorias[j]].push(filmes[i]);
    }
  }
  const modelo = document.querySelector(
    ".listagem-categorias .categorias-item"
  );
  modelo.classList.remove("d-none");
  modelo.remove();

  const base = document.querySelector(".listagem-categorias");
  Object.keys(categorias).forEach((categoria) => {
    const modeloItem = modelo.cloneNode(true);

    const categoria_titulo = encontrarFilho(
      modeloItem.childNodes,
      callbackClassList(modeloItem.childNodes, "categoria-titulo")
    );
    categoria_titulo.innerText = categoria;

    const carousel = encontrarFilho(
      modeloItem.childNodes,
      callbackClassList(modeloItem.childNodes, "carousel")
    );

    const carousel_inner = encontrarFilho(
      carousel.childNodes,
      callbackClassList(carousel.childNodes, "carousel-inner")
    );

    const modeloListagemItem = encontrarFilho(
      carousel_inner.childNodes,
      callbackClassList(carousel_inner.childNodes, "carousel-item")
    ).cloneNode();
    modeloListagemItem.classList.remove("active");

    carousel_inner.innerHTML = "";

    const filmes_categoria = [...categorias[categoria]];
    const carouselFilmesItens = [];
    do {
      const filmes_splice = filmes_categoria.splice(0, 5);
      const carousel_item = modeloListagemItem.cloneNode();

      if (carouselFilmesItens.length === 0)
        carousel_item.classList.add("active");

      const el_listagem_filmes = document.createElement("div");
      el_listagem_filmes.classList.add(
        ...["listagem-filmes", "d-flex", "align-itens-center"]
      );

      filmes_splice.forEach((filme) => {
        const el_filme_link = document.createElement("a");
        el_filme_link.href = `filme.html?id=${filme.id}`;
        el_filme_link.classList.add("listagem-filmes-item");
        const el_filme_figure = document.createElement("figure");
        el_filme_figure.classList.add("mb-0");
        const el_filme_imagem = document.createElement("div");
        el_filme_imagem.classList.add(
          ...["imagem-background", "imagem-background--cover"]
        );
        el_filme_imagem.style.backgroundImage = `url(${filme.imagem})`;

        el_filme_figure.appendChild(el_filme_imagem);
        el_filme_link.appendChild(el_filme_figure);
        el_listagem_filmes.appendChild(el_filme_link);
      });

      carousel_item.appendChild(el_listagem_filmes);
      carousel_inner.appendChild(carousel_item);

      carouselFilmesItens.push(filmes_splice);
    } while (filmes_categoria.length);

    const id_carousel = `carousel${categoria.split(" ").join("_")}`;
    carousel.id = id_carousel;

    encontrarFilhos(
      carousel.childNodes,
      callbackClassList(carousel.childNodes, "carousel-control")
    ).forEach((control) => {
      control.dataset.bsTarget = `#${id_carousel}`;
    });

    const navegacao = encontrarFilho(
      carousel.childNodes,
      callbackClassList(carousel.childNodes, "carousel-navegacao")
    );

    const carousel_controls = encontrarFilhos(
      carousel.childNodes,
      callbackClassList(carousel.childNodes, "carousel-control")
    );

    const modeloNavegacao = encontrarFilho(
      navegacao.childNodes,
      callbackTagName(navegacao.childNodes, "button")
    ).cloneNode();
    modeloNavegacao.classList.remove("active");

    navegacao.innerHTML = "";

    for (let i = 0; i < carouselFilmesItens.length; i++) {
      const itemNavegacao = modeloNavegacao.cloneNode();
      itemNavegacao.dataset.bsTarget = `#${id_carousel}`;
      itemNavegacao.dataset.bsSlideTo = i;
      itemNavegacao.arialLabel = `slide ${i}`;

      if (i === 0) itemNavegacao.classList.add('active')
      
      navegacao.appendChild(itemNavegacao);
    }

    if (carouselFilmesItens.length > 1) {
      carousel_controls.forEach((control) => {
        control.dataset.bsTarget = `#${id_carousel}`;
      });
    } else {
      carousel_controls.forEach((control) => control.remove());
    }

    base.appendChild(modeloItem);
  });
}

window.onload = function () {
  carregarPerfil();
  carregarPerfis();
  carregarNovidades();
  notificacoes();
  carregarSlideFilmes();

  botoesSair();

  document
    .querySelector("#blocoNovidades")
    .addEventListener("click", visualizarNovidades);

  document
    .querySelector("#buscarFilmes")
    .addEventListener("click", buscarFilmes);
};

redirecionarLogin(false);
