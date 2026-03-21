//Muestro el email del usuario logueado
const userLoggedSpan = document.getElementById('user-logged');
const emailGuardado = localStorage.getItem('usuarioLogueado');

if (emailGuardado) {
    userLoggedSpan.innerText = emailGuardado;
}

//Importo los datos de las ofertas 
import { oferta_demanda } from "./datos.js";

//Invoco al contenedor que contiene las tarjetas
const contenedor = document.getElementById('contenedor-tarjetas');

//Vacío el contenedor
contenedor.innerHTML = '';

//Creo un HTML para cada tarjeta
oferta_demanda.forEach(item => {
    //Si es oferta asigno verde y si es demanda asigno azul
    const color = item.tipo === 'oferta' ? 'success' : 'primary';

    //Defino el molde para cada tarjeta
    const cardHTML = `
        <div class="col-md-4 mb-3">
            <div class="card border-${color}">
                <div class="card-body">
                    <h5 class="card-title text-${color}">${item.titulo}</h5>
                    <p class="card-text">${item.descripcion}</p>
                    <button class="btn btn-${color} btn-sm">Ver más</button>
                </div>
            </div>
        </div>
    `;
    // Lo inyecto en el HTML
    contenedor.innerHTML += cardHTML;
});