import { publicaciones } from "./datos.js";

// Buscar elementos del HTML
const formularioPublicacion = document.getElementById("form-publicacion");
const inputTipo = document.getElementById("tipo");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const listaOfertas = document.getElementById("lista-ofertas");

// Función para mostrar todas las publicaciones
function pintarPublicaciones() {
  // Limpiar el contenido anterior
  listaOfertas.innerHTML = "";

  // Recorrer el array
  for (let i = 0; i < publicaciones.length; i++) {
    const publicacion = publicaciones[i];

    // Elegir color
    let colorBorde = "primary";

    if (publicacion.tipo === "demanda") {
      colorBorde = "success";
    }

    // Crear columna
    const columna = document.createElement("div");
    columna.className = "col-md-6 mb-3";

    // Crear tarjeta
    columna.innerHTML = `
      <div class="card border-${colorBorde}">
        <div class="card-body">
          <h3 class="card-title h5">${publicacion.titulo}</h3>
          <p class="card-text"><strong>Tipo:</strong> ${publicacion.tipo}</p>
          <p class="card-text">${publicacion.descripcion}</p>
          <button class="btn btn-danger btn-sm boton-borrar" data-id="${publicacion.id}">
            Borrar
          </button>
        </div>
      </div>
    `;

    // Añadir tarjeta a la lista
    listaOfertas.appendChild(columna);
  }

  // Buscar todos los botones de borrar
  const botonesBorrar = document.querySelectorAll(".boton-borrar");

  // Añadir evento a cada botón
  for (let i = 0; i < botonesBorrar.length; i++) {
    botonesBorrar[i].addEventListener("click", function () {
      const idABorrar = Number(this.dataset.id);

      borrarPublicacion(idABorrar);
    });
  }
}

// Función para borrar una publicación por id
function borrarPublicacion(id) {
  for (let i = 0; i < publicaciones.length; i++) {
    if (publicaciones[i].id === id) {
      publicaciones.splice(i, 1);
      break;
    }
  }

  pintarPublicaciones();
}

// Evento del formulario
formularioPublicacion.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Crear nuevo id
  const nuevoId = publicaciones.length > 0
    ? publicaciones[publicaciones.length - 1].id + 1
    : 1;

  // Crear nuevo objeto
  const nuevaPublicacion = {
    id: nuevoId,
    tipo: inputTipo.value,
    titulo: inputTitulo.value,
    descripcion: inputDescripcion.value
  };

  // Añadir al array
  publicaciones.push(nuevaPublicacion);

  // Limpiar formulario
  formularioPublicacion.reset();

  // Volver a pintar
  pintarPublicaciones();
});

// Pintar al cargar la página
pintarPublicaciones();