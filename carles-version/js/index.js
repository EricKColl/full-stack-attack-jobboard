/*
==============================================
DASHBOARD - LÓGICA PRINCIPAL
==============================================

Este archivo se encarga de:

1. Calcular estadísticas del sistema
2. Mostrar los valores en el dashboard
3. Renderizar las publicaciones recientes
4. Inicializar la zona de usuario de la navbar
*/


/*
==============================================
1. CALCULAR ESTADÍSTICAS DEL SISTEMA
==============================================
*/

const totalUsuarios = usuarios.length;
const totalOfertas = publicaciones.filter(publicacion => publicacion.tipo === "oferta").length;
const totalDemandas = publicaciones.filter(publicacion => publicacion.tipo === "demanda").length;


/*
==============================================
2. MOSTRAR ESTADÍSTICAS EN EL DASHBOARD
==============================================
*/

document.getElementById("usuarios").textContent = totalUsuarios;
document.getElementById("ofertas").textContent = totalOfertas;
document.getElementById("demandas").textContent = totalDemandas;


/*
==============================================
3. RENDERIZAR PUBLICACIONES RECIENTES
==============================================
*/

const contenedorPublicaciones = document.getElementById("lista-publicaciones");

publicaciones.forEach(publicacion => {
    const columna = document.createElement("div");
    columna.className = "col-12 col-md-6";

    const colorTipo = publicacion.tipo === "oferta" ? "success" : "primary";
    const textoTipo = publicacion.tipo === "oferta" ? "Oferta" : "Demanda";

    columna.innerHTML = `
        <div class="card shadow-sm border-0 h-100">
            <div class="card-body">
                <span class="badge text-bg-${colorTipo} mb-2">${textoTipo}</span>
                <h5 class="card-title">${publicacion.titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    ${publicacion.autor} · ${publicacion.ubicacion}
                </h6>
                <p class="card-text">${publicacion.descripcion}</p>
            </div>
        </div>
    `;

    contenedorPublicaciones.appendChild(columna);
});


/*
==============================================
4. INICIALIZAR NAVBAR
==============================================
*/

renderizarZonaUsuario();