/*
==============================================
GESTIÓN DE OFERTAS Y DEMANDAS
==============================================

Este archivo se encarga de:

1. Mostrar las publicaciones existentes
2. Permitir crear nuevas publicaciones
3. Permitir eliminar publicaciones
4. Usar el usuario logueado como autor
5. Ocultar formulario si no hay sesión
6. Inicializar la zona de usuario de la navbar
*/


/*
==============================================
1. REFERENCIAS DEL DOM
==============================================
*/

const formPublicacion = document.getElementById("form-publicacion");
const listaPublicaciones = document.getElementById("lista-publicaciones");


/*
==============================================
2. FUNCIÓN PARA RENDERIZAR PUBLICACIONES
==============================================
*/

function renderizarPublicaciones() {
    listaPublicaciones.innerHTML = "";

    publicaciones.forEach(publicacion => {
        const columna = document.createElement("div");
        columna.className = "col-12";

        const colorTipo = publicacion.tipo === "oferta" ? "success" : "primary";
        const textoTipo = publicacion.tipo === "oferta" ? "Oferta" : "Demanda";

        columna.innerHTML = `
            <div class="card shadow-sm border-0 h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge text-bg-${colorTipo}">
                            ${textoTipo}
                        </span>
                        <button class="btn btn-sm btn-danger btn-eliminar-publicacion" data-id="${publicacion.id}">
                            Eliminar
                        </button>
                    </div>

                    <h5 class="card-title">${publicacion.titulo}</h5>

                    <h6 class="card-subtitle mb-2 text-muted">
                        ${publicacion.autor} · ${publicacion.ubicacion}
                    </h6>

                    <p class="card-text mb-0">
                        ${publicacion.descripcion}
                    </p>
                </div>
            </div>
        `;

        listaPublicaciones.appendChild(columna);
    });

    activarBotonesEliminarPublicacion();
}


/*
==============================================
3. FUNCIÓN PARA ELIMINAR PUBLICACIONES
==============================================
*/

function activarBotonesEliminarPublicacion() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar-publicacion");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function () {
            const idPublicacion = Number(this.dataset.id);

            const indice = publicaciones.findIndex(publicacion => publicacion.id === idPublicacion);

            if (indice !== -1) {
                const confirmar = confirm("¿Seguro que quieres eliminar esta publicación?");

                if (confirmar) {
                    publicaciones.splice(indice, 1);
                }
            }

            renderizarPublicaciones();
        });
    });
}


/*
==============================================
4. CONTROL DE SESIÓN PARA FORMULARIO
==============================================
*/

const usuarioLogueado = obtenerUsuarioLogueado();

if (!usuarioLogueado) {
    formPublicacion.style.display = "none";

    const mensaje = document.createElement("div");
    mensaje.className = "alert alert-warning";
    mensaje.textContent = "Debes iniciar sesión para crear publicaciones.";

    formPublicacion.parentElement.prepend(mensaje);
}


/*
==============================================
5. AÑADIR NUEVA PUBLICACIÓN
==============================================
*/

formPublicacion.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para crear una publicación");
        return;
    }

    const tipo = document.getElementById("tipo").value;
    const titulo = document.getElementById("titulo").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const descripcion = document.getElementById("descripcion").value;

    const nuevoId = publicaciones.length > 0
        ? publicaciones[publicaciones.length - 1].id + 1
        : 1;

    const nuevaPublicacion = {
        id: nuevoId,
        tipo: tipo,
        titulo: titulo,
        autor: usuarioLogueado.nombre,
        ubicacion: ubicacion,
        descripcion: descripcion
    };

    publicaciones.push(nuevaPublicacion);
    renderizarPublicaciones();
    formPublicacion.reset();
});


/*
==============================================
6. INICIALIZAR PÁGINA
==============================================
*/

renderizarPublicaciones();
renderizarZonaUsuario();