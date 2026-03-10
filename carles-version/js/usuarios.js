/*
==============================================
GESTIÓN DE USUARIOS
==============================================

Este archivo se encarga de:

1. Mostrar los usuarios existentes en una tabla
2. Permitir añadir nuevos usuarios mediante un formulario
3. Permitir eliminar usuarios
4. Inicializar la zona de usuario de la navbar
*/


/*
==============================================
1. REFERENCIAS DEL DOM
==============================================
*/

const tablaUsuarios = document.getElementById("tabla-usuarios");
const formUsuario = document.getElementById("form-usuario");


/*
==============================================
2. FUNCIÓN PARA RENDERIZAR USUARIOS
==============================================
*/

function renderizarUsuarios() {
    tablaUsuarios.innerHTML = "";

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${usuario.id}">
                    Eliminar
                </button>
            </td>
        `;

        tablaUsuarios.appendChild(fila);
    });

    activarBotonesEliminar();
}


/*
==============================================
3. FUNCIÓN PARA ELIMINAR USUARIOS
==============================================
*/

function activarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            const idUsuario = Number(this.dataset.id);

            const indice = usuarios.findIndex(usuario => usuario.id === idUsuario);

            if (indice !== -1) {
                const confirmar = confirm("¿Seguro que quieres eliminar este usuario?");

                if (confirmar) {
                    usuarios.splice(indice, 1);
                }
            }

            renderizarUsuarios();
        });
    });
}


/*
==============================================
4. AÑADIR NUEVO USUARIO
==============================================
*/

formUsuario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    const emailExiste = usuarios.some(usuario => usuario.email === email);

    if (emailExiste) {
        alert("Ya existe un usuario con ese email");
        return;
    }

    const nuevoId = usuarios.length > 0
        ? usuarios[usuarios.length - 1].id + 1
        : 1;

    const nuevoUsuario = {
        id: nuevoId,
        nombre: nombre,
        email: email,
        password: password,
        rol: rol
    };

    usuarios.push(nuevoUsuario);
    renderizarUsuarios();
    formUsuario.reset();
});


/*
==============================================
5. INICIALIZAR PÁGINA
==============================================
*/

renderizarUsuarios();
renderizarZonaUsuario();