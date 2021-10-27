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

var modeloPerfil;

function adicionarPerfil(event) {
  event.preventDefault();
  const form = {};
  Object.keys(event.target.elements)
    .filter((el) => !Number(el) && el !== "0")
    .forEach((el) => {
      if (event.target.elements[el].type === "checkbox") {
        form[el] = event.target.elements[el].checked;
        event.target.elements[el].checked = false;
      } else {
        form[el] = event.target.elements[el].value;
        event.target.elements[el].value = "";
      }
    });

  form.id = perfis[perfis.length - 1].id + 1;
  perfis.push(form);

  document.querySelectorAll(".perfil-item").forEach((el) => {
    el.removeEventListener("click", function () {});
    el.remove();
  });
  const modalElemento = document.querySelector("#modalAdicionarPerfil");
  const modal = bootstrap.Modal.getInstance(modalElemento);
  modal.hide();

  carregarPerfis();
  verificarMaximoPerfil();
}

function carregarPerfis() {
  if (!modeloPerfil) {
    const itemBase = document.querySelector(".perfil-item");
    itemBase.classList.remove("d-none");
    itemBase.remove();
    modeloPerfil = itemBase.cloneNode(true);
    modeloPerfil.classList.add("d-flex");
  }

  const base = document.querySelector(".perfil-base");
  const perfilAddElement = document.querySelector(
    ".perfil-base .js-btn-adicionar"
  );

  const encontrarElemento = function (base, classItem) {
    return Object.keys(base)
      .filter(
        (chave) =>
          base[chave].classList && base[chave].classList.contains(classItem)
      )
      .map((chave) => base[chave])[0];
  };

  perfis.forEach((el) => {
    const modeloItem = modeloPerfil.cloneNode(true);
    const itemLink = encontrarElemento(modeloItem.childNodes, "bloco-perfil");
    itemLink.dataset.perfil = el.id;
    itemLink.addEventListener("click", selecionarPerfil);

    const imgBloco = encontrarElemento(
      itemLink.childNodes,
      "perfil-img-conteudo"
    );

    imgBloco.style.backgroundColor = el.fundo;

    const perfilNome = encontrarElemento(itemLink.childNodes, "perfil-nome");

    perfilNome.innerText = el.nome;
    base.insertBefore(modeloItem, perfilAddElement);
  });
}

function selecionarPerfil(event) {
  const perfilId = event.currentTarget.dataset.perfil;
  const perfil = perfis.filter((el) => el.id === Number(perfilId))[0];

  localStorage.setItem("perfil", JSON.stringify(perfil));
}

function verificarMaximoPerfil() {
  const max = 4;

  if (perfis.length === max) {
    const perfilAddElement = document.querySelector(
      ".perfil-base .js-btn-adicionar"
    );
    perfilAddElement.classList.add("d-none");
  }
}

window.onload = function () {
  botoesSair();

  carregarPerfis();
  verificarMaximoPerfil();

  document
    .querySelector("#formAdicionarPerfil")
    .addEventListener("submit", adicionarPerfil);
};

redirecionarLogin(false);
