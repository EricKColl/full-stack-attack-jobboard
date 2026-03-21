//Importo los usuarios
import { usuarios } from './datos.js';

//Invoco el formulario con el mensaje de error
const form = document.getElementById('form-login');
const mensajeError = document.getElementById('mensaje-error');

//Capturo el evento del boton
form.addEventListener('submit', (e) => {
    // Evito que la página se recargue
    e.preventDefault(); 

    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;

    // Busco si existe el usuario con ese email y esa contraseña
    const usuarioValido = usuarios.find(u => u.email === emailInput && u.password === passInput);

    //Si existe guardo el email en el dashboard del navegador
    if (usuarioValido) {   
        localStorage.setItem('usuarioLogueado', usuarioValido.email);
        
        // Redirijo al Dashboard
        window.location.href = 'index.html';
    } else {
        //Mensaje de error si no existe
        mensajeError.style.display = 'block';
    }
});