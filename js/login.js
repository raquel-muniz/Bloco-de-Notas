const user = JSON.parse(localStorage.getItem("currentUser"))

if(!user){
window.location.href = "formLogin.html"
}

document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault()

const email = document.getElementById("loginEmail").value.trim()
const senha = document.getElementById("loginPassword").value

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

const user = usuarios.find(u => u.email === email && u.senha === senha)

if(!user){
alert("Email ou senha incorretos")
return
}

localStorage.setItem("currentUser", JSON.stringify(user))

window.location.href = "home.html"

})

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginPassword').value;

  // Busca o usuário cadastrado
  const usuarioSalvo = JSON.parse(localStorage.getItem('currentUser'));

  if (!usuarioSalvo) {
    alert('Nenhum usuário cadastrado. Cadastre-se primeiro.');
    return;
  }

  if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
    // Login válido, mantém o usuário como logado
    localStorage.setItem('currentUser', JSON.stringify(usuarioSalvo));
    window.location.href = 'home.html';
  } else {
    alert('E-mail ou senha incorretos.');
  }
});
