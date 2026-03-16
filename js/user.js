document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("fastnotes_logged"));
  if (!user) return (window.location.href = "login.html");

  const nome = document.getElementById("editNome");
  const email = document.getElementById("editEmail");
  const form = document.getElementById("profileForm");

  nome.value = user.nome;
  email.value = user.email;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    user.nome = nome.value;
    const foto = document.getElementById("editFoto").files[0];
    if (foto) {
      const reader = new FileReader();
      reader.onload = () => {
        user.foto = reader.result;
        saveUser(user);
      };
      reader.readAsDataURL(foto);
    } else {
      saveUser(user);
    }
  });
});

function saveUser(user) {
  localStorage.setItem("fastnotes_user_" + user.email, JSON.stringify(user));
  localStorage.setItem("fastnotes_logged", JSON.stringify(user));
  alert("Perfil atualizado!");
  window.location.href = "index.html";
}
