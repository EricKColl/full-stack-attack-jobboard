import { usuarios } from "./datos.js";

// Elementos del DOM
const formLogin = document.getElementById("form-login");
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");
const mensajeLogin = document.getElementById("mensaje-login");
const usuarioLogueadoNav = document.getElementById("usuario-logueado-nav");

// Inicializar pantalla login
function inicializarLogin() {
  mostrarUsuarioLogueadoEnNav();
  formLogin.addEventListener("submit", gestionarLogin);
}

// Mostrar usuario logueado en la navbar (si existe)
function mostrarUsuarioLogueadoEnNav() {
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

// Gestionar envío del formulario
function gestionarLogin(evento) {
  evento.preventDefault();

  const email = emailLogin.value.trim();
  const password = passwordLogin.value.trim();

  // Validación básica
  if (!email || !password) {
    mostrarMensaje(
      "Debes completar el correo y la contraseña.",
      "danger"
    );
    return;
  }

  // Buscar usuario por email y contraseña
  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === email && usuario.password === password
  );

  if (!usuarioEncontrado) {
    mostrarMensaje(
      "Credenciales incorrectas. Revisa el correo y la contraseña.",
      "danger"
    );
    return;
  }

  // Guardar sesión en localStorage (simulado)
  const usuarioParaGuardar = {
    id: usuarioEncontrado.id,
    nombre: usuarioEncontrado.nombre,
    apellidos: usuarioEncontrado.apellidos,
    email: usuarioEncontrado.email,
    rol: usuarioEncontrado.rol
  };

  localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioParaGuardar));

  // Actualizar navbar y mostrar mensaje
  usuarioLogueadoNav.textContent = `Sesión: ${usuarioEncontrado.email}`;
  mostrarMensaje(`Login correcto. Bienvenido/a, ${usuarioEncontrado.nombre}.`, "success");

  // Limpiar formulario
  formLogin.reset();
}

// Mostrar mensajes Bootstrap
function mostrarMensaje(texto, tipo) {
  mensajeLogin.innerHTML = `
    <div class="alert alert-${tipo}" role="alert">
      ${texto}
    </div>
  `;
}

inicializarLogin();