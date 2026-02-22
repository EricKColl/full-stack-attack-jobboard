import {
  publicaciones,
  obtenerSiguienteIdPublicacion,
  agregarPublicacion,
  eliminarPublicacionPorId
} from "./datos.js";

// Elementos del DOM
const formPublicacion = document.getElementById("form-publicacion");
const tipoPublicacion = document.getElementById("tipo-publicacion");
const tituloPublicacion = document.getElementById("titulo-publicacion");
const categoriaPublicacion = document.getElementById("categoria-publicacion");
const autorPublicacion = document.getElementById("autor-publicacion");
const ubicacionPublicacion = document.getElementById("ubicacion-publicacion");
const descripcionPublicacion = document.getElementById("descripcion-publicacion");
const emailPublicacion = document.getElementById("email-publicacion");

const tablaPublicacionesBody = document.getElementById("tabla-publicaciones-body");
const mensajePublicacion = document.getElementById("mensaje-publicacion");
const usuarioLogueadoNav = document.getElementById("usuario-logueado-nav");

// Inicializar página
function inicializarPublicaciones() {
  mostrarUsuarioLogueadoEnNav();
  pintarTablaPublicaciones();
  formPublicacion.addEventListener("submit", gestionarAltaPublicacion);
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

// Pintar tabla de publicaciones
function pintarTablaPublicaciones() {
  if (publicaciones.length === 0) {
    tablaPublicacionesBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">
          No hay publicaciones registradas.
        </td>
      </tr>
    `;
    return;
  }

  tablaPublicacionesBody.innerHTML = "";

  publicaciones.forEach((publicacion) => {
    const fila = document.createElement("tr");

    const badgeTipo =
      publicacion.tipo === "oferta"
        ? '<span class="badge text-bg-primary">Oferta</span>'
        : '<span class="badge text-bg-success">Demanda</span>';

    fila.innerHTML = `
      <td>${publicacion.id}</td>
      <td>${badgeTipo}</td>
      <td>${publicacion.titulo}</td>
      <td>${publicacion.categoria}</td>
      <td>${publicacion.ubicacion}</td>
      <td>${publicacion.emailContacto}</td>
      <td>
        <button class="btn btn-sm btn-danger" data-id="${publicacion.id}">
          Eliminar
        </button>
      </td>
    `;

    const botonEliminar = fila.querySelector("button");
    botonEliminar.addEventListener("click", () => {
      eliminarPublicacion(publicacion.id);
    });

    tablaPublicacionesBody.appendChild(fila);
  });
}

// Gestionar alta de publicación
function gestionarAltaPublicacion(evento) {
  evento.preventDefault();

  const tipo = tipoPublicacion.value;
  const titulo = tituloPublicacion.value.trim();
  const categoria = categoriaPublicacion.value.trim();
  const autor = autorPublicacion.value.trim();
  const ubicacion = ubicacionPublicacion.value.trim();
  const descripcion = descripcionPublicacion.value.trim();
  const emailContacto = emailPublicacion.value.trim().toLowerCase();

  // Validación básica
  if (
    !tipo ||
    !titulo ||
    !categoria ||
    !autor ||
    !ubicacion ||
    !descripcion ||
    !emailContacto
  ) {
    mostrarMensaje("Todos los campos son obligatorios.", "danger");
    return;
  }

  if (descripcion.length < 10) {
    mostrarMensaje(
      "La descripción debe tener al menos 10 caracteres.",
      "danger"
    );
    return;
  }

  // Crear fecha simple YYYY-MM-DD
  const fechaActual = new Date().toISOString().split("T")[0];

  const nuevaPublicacion = {
    id: obtenerSiguienteIdPublicacion(),
    tipo,
    titulo,
    categoria,
    autor,
    ubicacion,
    descripcion,
    emailContacto,
    fecha: fechaActual
  };

  agregarPublicacion(nuevaPublicacion);

  pintarTablaPublicaciones();
  mostrarMensaje("Publicación guardada correctamente.", "success");
  formPublicacion.reset();
}

// Eliminar publicación
function eliminarPublicacion(idPublicacion) {
  const eliminado = eliminarPublicacionPorId(idPublicacion);

  if (!eliminado) {
    mostrarMensaje("No se pudo eliminar la publicación.", "danger");
    return;
  }

  pintarTablaPublicaciones();
  mostrarMensaje("Publicación eliminada correctamente.", "success");
}

// Mostrar mensajes Bootstrap
function mostrarMensaje(texto, tipo) {
  mensajePublicacion.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

inicializarPublicaciones();