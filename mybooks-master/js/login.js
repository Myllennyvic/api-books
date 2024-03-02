var users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" }
];

const logform = document.getElementById("cadastrarbutton")
console.log(logform)
logform.addEventListener('click', function(event) {
    event.preventDefault();
    var username = document.getElementById("nome_login").value;
    var isLoggedIn = document.getElementById("manterlogado").checked;

    // Verifica se o usuário existe no JSON
    var userExists = users.find(user => user.username === username);

    if (userExists) {
        window.location.href = '../pages/infoBooks.html'
        // Redirecione o usuário para outra página ou faça outras operações necessárias
    } else {
        alert("Usuário não encontrado.");
    }
});

const cadform = document.getElementById("loginbutton")
console.log(cadform)
cadform.addEventListener('click', function(event) {
    event.preventDefault();
    var username = document.getElementById("nome_cad").value;
    var password = document.getElementById("senha_cad").value;

    // Verifica se o usuário já existe no JSON
    var userExists = users.find(user => user.username === username);

    if (userExists) {
        alert("Este usuário já existe. Por favor, escolha outro nome de usuário.");
    } else {
        // Adiciona o novo usuário ao JSON
        users.push({username: username, password: password});
        alert("Cadastro bem-sucedido! Você já pode fazer login.");
    }
});

