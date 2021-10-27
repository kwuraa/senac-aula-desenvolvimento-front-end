function entrar(event) {
  event.preventDefault();

  const form = {};
  const elementosChaves = Object.keys(event.target.elements);
  elementosChaves
    .filter((el) => !Number(el) && el !== "0")
    .forEach((el) => {
      if (event.target.elements[el].type === "checkbox") {
        form[el] = event.target.elements[el].checked;
      } else {
        form[el] = event.target.elements[el].value;
      }
    });

  if (form.senha.length < 3) {
    alert("A senha precisa ter no minimo 3 caracteres!");
    return;
  }

  // Salvar em cookie
  if (form.loginLembrar) {
    localStorage.setItem("login", JSON.stringify(form));
  } else {
    sessionStorage.setItem("login", JSON.stringify(form));
  }

  window.location.href = "perfil.html";
}

window.onload = function () {
  const formEmail = JSON.parse(localStorage.getItem("formEmail"));
  if (formEmail) {
    const form = document.querySelector("form");
    form.elements.login.value = formEmail.email;
  }

  document.querySelector("#formLogin").addEventListener("submit", entrar);
};

redirecionarLogin(true);
