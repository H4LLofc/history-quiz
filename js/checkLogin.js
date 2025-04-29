// Verifica se o usuário está logado
if (!localStorage.getItem("username")) {
    window.location.href = "login.html";
}
