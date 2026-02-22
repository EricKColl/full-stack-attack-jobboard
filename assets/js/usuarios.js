import {
  usuarios,
  obtenerSiguienteIdUsuario,
  agregarUsuario,
  eliminarUsuarioPorId
} from "./datos.js";

// Elementos del DOM
const formUsuario = document.getElementById("form-usuario");
const nombreUsuario = document.getElementById("nombre-usuario");
const apellidosUsuario = document.getElementById("apellidos-usuario");
const emailUsuario = document.getElementById("email-usuario");
const passwordUsuario = document.getElementById("password-usuario");
const rolUsuario = document.getElementById("rol-usuario");

const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");
const mensajeUsuario = document.getElementById("mensaje-usuario");
const usuarioLogueadoNav = document.getElementById("usuario-logueado-nav");

// Inicializar página
function inicializarUsuarios() {
  mostrarUsuarioLogueadoEnNav();
  pintarTablaUsuarios();
  formUsuario.addEventListener("submit", gestionarAltaUsuario);
}

// Mostrar usuario logueado en navbar
function mostrarUsuarioLogueadoEnNav() {
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");

  if (!usuarioGuardado) {
    usuarioLogueadoNav.textContent = "No has iniciado sesión";
    return;
  }

  try {
    const usuario = JSON.parse(usuarioGuardado);
    usuarioLogueadoNav.textContent = `Sesión: ${usuario.email}`;
  } catch (error) {
    usuarioLogueadoNav.textContent = "No has iniciado sesión";
  }
}

// Pintar tabla de usuarios
function pintarTablaUsuarios() {
  if (usuarios.length === 0) {
    tablaUsuariosBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted">
          No hay usuarios registrados.
        </td>
      </tr>
    `;
    return;
  }

  tablaUsuariosBody.innerHTML = "";

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre} ${usuario.apellidos}</td>
      <td>${usuario.email}</td>
      <td><span class="badge text-bg-secondary">${capitalizarTexto(usuario.rol)}</span></td>
      <td>
        <button class="btn btn-sm btn-danger" data-id="${usuario.id}">
          Eliminar
        </button>
      </td>
    `;

    // Listener para botón eliminar
    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", () => {
      eliminarUsuario(usuario.id);
    });

    tablaUsuariosBody.appendChild(fila);
  });
}

// Gestionar alta de usuario
function gestionarAltaUsuario(evento) {
  evento.preventDefault();

  const nombre = nombreUsuario.value.trim();
  const apellidos = apellidosUsuario.value.trim();
  const email = emailUsuario.value.trim().toLowerCase();
  const password = passwordUsuario.value.trim();
  const rol = rolUsuario.value;

  // Validaciones básicas
  if (!nombre || !apellidos || !email || !password || !rol) {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }

  if (password.length < 4) {
    mostrarMensaje("La contraseña debe tener al menos 4 caracteres.", "danger");
    return;
  }

  const emailExiste = usuarios.some((usuario) => usuario.email === email);

  if (emailExiste) {
    mostrarMensaje("Ya existe un usuario con ese correo electrónico.", "danger");
    return;
  }

  // Crear usuario nuevo
  const nuevoUsuario = {
    id: obtenerSiguienteIdUsuario(),
    nombre,
    apellidos,
    email,
    password,
    rol
  };

  agregarUsuario(nuevoUsuario);

  // Refrescar interfaz
  pintarTablaUsuarios();
  mostrarMensaje(`Usuario ${nombre} ${apellidos} creado correctamente.`, "success");
  formUsuario.reset();
}

// Eliminar usuario
function eliminarUsuario(idUsuario) {
  const eliminado = eliminarUsuarioPorId(idUsuario);

  if (!eliminado) {
    mostrarMensaje("No se pudo eliminar el usuario.", "danger");
    return;
  }

  pintarTablaUsuarios();
  mostrarMensaje("Usuario eliminado correctamente.", "success");
}

// Mostrar mensajes Bootstrap
function mostrarMensaje(texto, tipo) {
  mensajeUsuario.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

// Utilidad simple
function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

inicializarUsuarios();