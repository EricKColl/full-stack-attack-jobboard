//Importo los usuarios
import { usuarios } from './datos.js';

//Invoco la tabla de usuarios, el formulario y el usuario loggeado
const tabla = document.getElementById('tabla-usuarios');
const form = document.getElementById('form-usuarios');
const userLoggedSpan = document.getElementById('user-logged');

userLoggedSpan.innerText = localStorage.getItem('usuarioLogueado') || "Invitado";

function pintarUsuarios() {
    tabla.innerHTML = '';
    usuarios.forEach((u, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${u.nombre} ${u.apellido}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoUsuario = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email-nuevo').value,
        password: document.getElementById('pass-nuevo').value
    };
    usuarios.push(nuevoUsuario);
    pintarUsuarios();
    form.reset();
});

window.eliminarUsuario = (index) => {
    if(confirm('¿Deseas eliminar a este usuario?')) {
        usuarios.splice(index, 1);
        pintarUsuarios();
    }
};

pintarUsuarios();