import { usuarios } from "./datos.js";

// Buscar elementos del HTML
const formularioUsuario = document.getElementById("form-usuario");
const inputNombre = document.getElementById("nombre");
const inputEmailUsuario = document.getElementById("email-usuario");
const inputPasswordUsuario = document.getElementById("password-usuario");
const listaUsuarios = document.getElementById("lista-usuarios");

// Función para mostrar usuarios
function pintarUsuarios() {
  // Limpiar zona antes de volver a pintar
  listaUsuarios.innerHTML = "";

  // Recorrer el array de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];

    // Crear columna
    const columna = document.createElement("div");
    columna.className = "col-md-6 mb-3";

    // Crear tarjeta
    columna.innerHTML = `
      <div class="card border-dark">
        <div class="card-body">
          <h3 class="card-title h5">${usuario.nombre}</h3>
          <p class="card-text"><strong>Email:</strong> ${usuario.email}</p>
          <p class="card-text"><strong>Contraseña:</strong> ${usuario.password}</p>
          <button class="btn btn-danger btn-sm boton-borrar-usuario" data-id="${usuario.id}">
            Borrar
          </button>
        </div>
      </div>
    `;

    // Añadir tarjeta a la lista
    listaUsuarios.appendChild(columna);
  }

  // Buscar todos los botones de borrar
  const botonesBorrarUsuario = document.querySelectorAll(".boton-borrar-usuario");

  // Añadir evento click a cada botón
  for (let i = 0; i < botonesBorrarUsuario.length; i++) {
    botonesBorrarUsuario[i].addEventListener("click", function () {
      const idABorrar = Number(this.dataset.id);

      borrarUsuario(idABorrar);
    });
  }
}

// Función para borrar un usuario
function borrarUsuario(id) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuarios.splice(i, 1);
      break;
    }
  }

  pintarUsuarios();
}

// Evento del formulario
formularioUsuario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Crear nuevo id
  const nuevoId = usuarios.length > 0
    ? usuarios[usuarios.length - 1].id + 1
    : 1;

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: nuevoId,
    nombre: inputNombre.value,
    email: inputEmailUsuario.value,
    password: inputPasswordUsuario.value
  };

  // Añadir al array
  usuarios.push(nuevoUsuario);

  // Limpiar formulario
  formularioUsuario.reset();

  // Volver a pintar
  pintarUsuarios();
});

// Pintar usuarios al cargar
pintarUsuarios();