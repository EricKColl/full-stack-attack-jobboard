/*
==============================================
LOGIN DE USUARIO
==============================================

Este script gestiona:

1. Lectura del formulario de login
2. Comprobación de usuario en el array usuarios
3. Guardado del usuario en localStorage
4. Redirección al dashboard si login correcto
5. Mostrar error si las credenciales no coinciden
6. Inicializar la navbar
*/


const formLogin = document.getElementById("form-login");


formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === email &&
        usuario.password === password
    );

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
        window.location.href = "index.html";
    } else {
        document.getElementById("mensaje-error").textContent =
            "Email o contraseña incorrectos";
    }
});


renderizarZonaUsuario();