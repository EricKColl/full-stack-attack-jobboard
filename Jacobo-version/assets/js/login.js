import { usuarios } from "./datos.js";

// Buscamos los elementos del HTML
const formularioLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const mensajeLogin = document.getElementById("mensaje-login");

// Escuchar el envío del formulario
formularioLogin.addEventListener("submit", function (evento) {
  // Evitar que la página se recargue
  evento.preventDefault();

  // Guardar lo que ha escrito el usuario
  const emailEscrito = inputEmail.value;
  const passwordEscrita = inputPassword.value;

  // Variable para saber si encontramos al usuario
  let usuarioEncontrado = null;

  // Recorrer el array de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    const usuarioActual = usuarios[i];

    // Comprobar si coinciden email y contraseña
    if (
      usuarioActual.email === emailEscrito &&
      usuarioActual.password === passwordEscrita
    ) {
      usuarioEncontrado = usuarioActual;
    }
  }

  // Mostrar mensaje según el resultado
  if (usuarioEncontrado !== null) {
    mensajeLogin.innerHTML = `
      <div class="alert alert-success">
        Login correcto. Bienvenido, ${usuarioEncontrado.nombre}.
      </div>
    `;
  } else {
    mensajeLogin.innerHTML = `
      <div class="alert alert-danger">
        Email o contraseña incorrectos.
      </div>
    `;
  }
});