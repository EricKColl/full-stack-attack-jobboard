import {
  usuarios,
  publicaciones,
  obtenerTotalOfertas,
  obtenerTotalDemandas,
  obtenerTotalUsuarios
} from "./datos.js";

// Elementos del DOM
const totalOfertasElemento = document.getElementById("total-ofertas");
const totalDemandasElemento = document.getElementById("total-demandas");
const totalUsuariosElemento = document.getElementById("total-usuarios");
const contenedorPublicaciones = document.getElementById("contenedor-publicaciones");
const usuarioLogueadoNav = document.getElementById("usuario-logueado-nav");

// Inicializar dashboard
function inicializarDashboard() {
  pintarResumen();
  pintarPublicaciones();
  mostrarUsuarioLogueadoEnNav();
}

// Mostrar cifras resumen
function pintarResumen() {
  totalOfertasElemento.textContent = obtenerTotalOfertas();
  totalDemandasElemento.textContent = obtenerTotalDemandas();
  totalUsuariosElemento.textContent = obtenerTotalUsuarios();
}

// Mostrar tarjetas de publicaciones
function pintarPublicaciones() {
  if (!publicaciones.length) {
    contenedorPublicaciones.innerHTML = `
      <div class="col-12">
        <div class="alert alert-secondary mb-0">
          Aún no hay publicaciones cargadas.
        </div>
      </div>
    `;
    return;
  }

  contenedorPublicaciones.innerHTML = "";

  publicaciones.forEach((publicacion) => {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6";

    const badgeClase =
      publicacion.tipo === "oferta" ? "badge-oferta" : "badge-demanda";

    const tipoTexto =
      publicacion.tipo === "oferta" ? "Oferta" : "Demanda";

    columna.innerHTML = `
      <div class="card card-publicacion h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge ${badgeClase}">${tipoTexto}</span>
            <small class="text-muted">${publicacion.fecha}</small>
          </div>

          <h3 class="h5">${publicacion.titulo}</h3>
          <p class="mb-2"><strong>Categoría:</strong> ${publicacion.categoria}</p>
          <p class="mb-2"><strong>Autor:</strong> ${publicacion.autor}</p>
          <p class="mb-2"><strong>Ubicación:</strong> ${publicacion.ubicacion}</p>
          <p class="mb-0 text-muted">${publicacion.descripcion}</p>
        </div>
      </div>
    `;

    contenedorPublicaciones.appendChild(columna);
  });
}

// Simulación de usuario logueado en navegación (todavía sin login real)
function mostrarUsuarioLogueadoEnNav() {
  // En pasos posteriores lo cambiaremos con el login real.
  // De momento, si no hay nada guardado, mostramos el texto por defecto.
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

inicializarDashboard();