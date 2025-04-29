document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Verifica se os campos foram preenchidos
    if (!username || !password) {
        mostrarErro("Preencha todos os campos!");
        return;
    }

    // Pega usuários do localStorage ou array vazio
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o nome já foi usado
    const jaExiste = usuarios.find((user) => user.username.toLowerCase() === username.toLowerCase());

    if (jaExiste) {
        mostrarErro("Esse nome já está sendo usado! Escolha outro.");
        return;
    }

    // Adiciona novo usuário
    usuarios.push({ username, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("username", username); // Mantém o usuário logado

    // Redireciona para a página principal
    window.location.href = "index.html";
});

function mostrarErro(mensagem) {
    const erroExistente = document.querySelector(".erro-login");
    if (erroExistente) erroExistente.remove();

    const div = document.createElement("div");
    div.className = "erro-login";
    div.textContent = mensagem;
    div.style.background = "#f8d7da";
    div.style.color = "#721c24";
    div.style.padding = "10px";
    div.style.marginTop = "15px";
    div.style.border = "1px solid #f5c6cb";
    div.style.borderRadius = "8px";
    div.style.fontWeight = "bold";

    document.querySelector(".login-container").appendChild(div);
}
