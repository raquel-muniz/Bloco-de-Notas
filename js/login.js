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
