import { publicaciones } from "./datos.js";

// Buscar en el HTML los elementos donde vamos a mostrar datos
const totalOfertas = document.getElementById("total-ofertas");
const totalDemandas = document.getElementById("total-demandas");
const listaPublicaciones = document.getElementById("lista-publicaciones");

// Contadores
let contadorOfertas = 0;
let contadorDemandas = 0;

// Recorrer todas las publicaciones
for (let i = 0; i < publicaciones.length; i++) {
  const publicacion = publicaciones[i];

  // Contar ofertas y demandas
  if (publicacion.tipo === "oferta") {
    contadorOfertas++;
  } else if (publicacion.tipo === "demanda") {
    contadorDemandas++;
  }

  // Crear una columna para Bootstrap
  const columna = document.createElement("div");
  columna.className = "col-md-4 mb-3";

  // Elegir color según tipo
  let colorBorde = "primary";

  if (publicacion.tipo === "demanda") {
    colorBorde = "success";
  }

  // Crear tarjeta
  columna.innerHTML = `
    <div class="card border-${colorBorde}">
      <div class="card-body">
        <h3 class="card-title h5">${publicacion.titulo}</h3>
        <p class="card-text"><strong>Tipo:</strong> ${publicacion.tipo}</p>
        <p class="card-text">${publicacion.descripcion}</p>
      </div>
    </div>
  `;

  // Añadir la tarjeta a la zona del HTML
  listaPublicaciones.appendChild(columna);
}

// Mostrar contadores en pantalla
totalOfertas.textContent = contadorOfertas;
totalDemandas.textContent = contadorDemandas;