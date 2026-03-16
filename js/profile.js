// pega o usuário logado
let user = JSON.parse(localStorage.getItem("currentUser"));

// se não estiver logado volta para login
if (!user) {
  window.location.href = "formLogin.html";
}

// preenche os campos
document.getElementById("editNome").value = user.nome;
document.getElementById("editEmail").value = user.email;


// salvar alterações
document.getElementById("profileForm").addEventListener("submit", function(e){

e.preventDefault();

const novoNome = document.getElementById("editNome").value;
const fotoInput = document.getElementById("editFoto");

user.nome = novoNome;


// se tiver nova foto
if (fotoInput.files.length > 0){

const reader = new FileReader();

reader.onload = function(e){

user.imagem = e.target.result;

salvarUsuario(user);

};

reader.readAsDataURL(fotoInput.files[0]);

}else{

salvarUsuario(user);

}

});



function salvarUsuario(user){

// atualiza usuário logado
localStorage.setItem("currentUser", JSON.stringify(user));

// atualiza lista de usuários
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

usuarios = usuarios.map(u => 
  u.email === user.email ? user : u
);

localStorage.setItem("usuarios", JSON.stringify(usuarios));

alert("Perfil atualizado!");

}