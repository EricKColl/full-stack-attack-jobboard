/*
==============================================
AUTH - GESTIÓN DE SESIÓN
==============================================

Este archivo centraliza la lógica de autenticación
en el frontend.

Se encarga de:

1. Leer el usuario logueado desde localStorage
2. Pintar la zona de usuario en la navbar
3. Permitir cerrar sesión

Así evitamos repetir este código en:
- index.js
- usuarios.js
- ofertas.js
*/


/*
==============================================
1. OBTENER USUARIO LOGUEADO
==============================================
*/

function obtenerUsuarioLogueado() {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");

    // Si no hay nada guardado, devolvemos null
    if (!usuarioGuardado) {
        return null;
    }

    // Si existe, convertimos el texto JSON a objeto JS
    return JSON.parse(usuarioGuardado);
}


/*
==============================================
2. RENDERIZAR ZONA DE USUARIO EN NAVBAR
==============================================

Esta función busca el contenedor con id "zona-usuario"
y pinta:

- botón Login, si no hay sesión
- nombre + botón cerrar sesión, si hay sesión
*/

function renderizarZonaUsuario() {
    const zonaUsuario = document.getElementById("zona-usuario");

    // Si la página no tiene ese contenedor, no hacemos nada
    if (!zonaUsuario) {
        return;
    }

    const usuarioLogueado = obtenerUsuarioLogueado();

    // Si no hay usuario logueado, mostramos botón Login
    if (!usuarioLogueado) {
        zonaUsuario.innerHTML = `
            <a class="btn btn-outline-light" href="login.html">
                Login
            </a>
        `;
        return;
    }

    // Si hay usuario logueado, mostramos nombre + logout
    zonaUsuario.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <span class="text-white">${usuarioLogueado.nombre}</span>
            <button id="btn-logout" class="btn btn-outline-light btn-sm">
                Cerrar sesión
            </button>
        </div>
    `;

    // Activar evento de cierre de sesión
    const btnLogout = document.getElementById("btn-logout");

    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });
    }
}