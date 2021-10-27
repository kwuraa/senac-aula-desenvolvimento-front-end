const perfis = [
  {
    id: 1,
    nome: "Teste 1",
    fundo: "dodgerblue",
  },
  {
    id: 2,
    nome: "Teste 2",
    fundo: "red",
  },
  {
    id: 3,
    nome: "Teste 3",
    fundo: "green",
  },
];

const novidades = [
  {
    imagem: "assets/imagens/infantil.png",
    link: "#",
    tipo: "novidades",
    texto: "Tem alguem na sua casa",
    infos: "Há 2 dias",
    visualizado: false,
  },
];

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

const encontrarFilhos = function (base, funcaoFilter) {
  return Object.keys(base)
    .filter(funcaoFilter)
    .map((chave) => base[chave])[0];
};

function carregarPerfil() {
  meuPerfil = JSON.parse(localStorage.getItem("perfil"));

  const perfilElemento = document.querySelector("#meuPerfil");

  const perfilFigure = encontrarFilhos(
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
      const itemLink = encontrarFilhos(
        modeloItem.childNodes,
        callbackClassList(modeloItem.childNodes, "dropdown-item")
      );
      itemLink.dataset.perfil = perfil.id;
      itemLink.addEventListener("click", selecionarPerfil);
      const itemLinkTexto = encontrarFilhos(
        itemLink.childNodes,
        callbackTagName(itemLink.childNodes, "span")
      );
      itemLinkTexto.innerText = perfil.nome;

      const itemFigure = encontrarFilhos(
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

    const itemLink = encontrarFilhos(
      itemModelo.childNodes,
      callbackClassList(itemModelo.childNodes, "dropdown-item")
    );

    const itemImg = encontrarFilhos(
      itemLink.childNodes,
      callbackTagName(itemLink.childNodes, "img")
    );
    itemImg.src = novidade.imagem;

    const itemTextos = encontrarFilhos(
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
  const badge = encontrarFilhos(
    blocoNovidade.childNodes,
    callbackClassList(blocoNovidade.childNodes, "badge")
  );

  if (!novidadesNaoLidas.length) {
    badge.classList.add("d-none");
  } else {
    badge.classList.remove("d-none");
    const badgeText = encontrarFilhos(
      badge.childNodes,
      callbackClassList(badge.childNodes, "novidades-texto")
    );

    badgeText.innerText =
      novidadesNaoLidas.length > 99 ? "99+" : novidadesNaoLidas.length;
  }
}

function visualizarNovidades(event) {
  novidades.forEach((el) => el.visualizado = true)

  carregarNovidades();
}

window.onload = function () {
  carregarPerfil();
  carregarPerfis();
  carregarNovidades();
  notificacoes();

  botoesSair();

  document
    .querySelector("#blocoNovidades")
    .addEventListener("click", visualizarNovidades);
};

redirecionarLogin(false);
