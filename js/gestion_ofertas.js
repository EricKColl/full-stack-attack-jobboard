//Importo las ofertas y demandas
import { oferta_demanda } from './datos.js';

//Invoco la tabla de gestión de ofertas, formulario y el usuario loggeado
const tabla = document.getElementById('tabla-gestion');
const form = document.getElementById('form-gestion');
const userLoggedSpan = document.getElementById('user-logged');

//Muestro quien esta loggeado
userLoggedSpan.innerText = localStorage.getItem('usuarioLogueado') || "Invitado";

function pintarTabla() {
    //Vacío la tabla
    tabla.innerHTML = ''; 
    
    oferta_demanda.forEach((item, index) => {
        const badgeColor = item.tipo === 'oferta' ? 'bg-success' : 'bg-primary';
        
        tabla.innerHTML += `
            <tr>
                <td>${item.titulo}</td>
                <td><span class="badge ${badgeColor}">${item.tipo}</span></td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarItem(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
//Función para añadir una nueva publicación
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevoItem = {
        //Genero un id temporal
        id: Date.now(), 
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        tipo: document.getElementById('tipo').value,
        usuario: localStorage.getItem('usuarioLogueado')
    };
    
    oferta_demanda.push(nuevoItem); 
    pintarTabla(); 
    form.reset();
});

window.eliminarItem = (index) => {
    if(confirm('¿Seguro que quieres borrar esta publicación?')) {
        oferta_demanda.splice(index, 1); 
        pintarTabla(); 
    }
};

pintarTabla();