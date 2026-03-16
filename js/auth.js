document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const cadastroForm = document.getElementById("cadastroForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("password").value;
      const user = JSON.parse(localStorage.getItem("fastnotes_user_" + email));

      if (user && user.senha === senha) {
        localStorage.setItem("fastnotes_logged", JSON.stringify(user));
        window.location.href = "index.html"; // redireciona ao app
      } else {
        alert("Usuário ou senha inválidos");
      }
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const foto = document.getElementById("foto").files[0];
      const reader = new FileReader();

      reader.onload = function () {
        const user = { nome, email, senha, foto: reader.result };
        localStorage.setItem("fastnotes_user_" + email, JSON.stringify(user));
        localStorage.setItem("fastnotes_logged", JSON.stringify(user));
        window.location.href = "index.html"; // redireciona ao app
      };

      if (foto) {
        reader.readAsDataURL(foto);
      } else {
        reader.onload();
      }
    });
  }
});
