# JobConnect

Aplicación web desarrollada como Producto 1 de la asignatura de Desarrollo Full Stack de Soluciones Web.

## Descripción

JobConnect es una aplicación frontend orientada a la gestión de ofertas y demandas laborales. Permite visualizar estadísticas en un dashboard, iniciar sesión con usuarios simulados, gestionar usuarios y crear o eliminar publicaciones laborales.

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- LocalStorage
- Visual Studio Code
- Live Server

## Funcionalidades implementadas

- Dashboard con estadísticas de usuarios, ofertas y demandas
- Visualización de publicaciones recientes
- Inicio de sesión con validación de credenciales
- Gestión de sesión mediante localStorage
- Alta y baja de usuarios
- Alta y baja de publicaciones
- Navbar dinámica según usuario logueado
- Ocultación del formulario de publicaciones si no hay sesión iniciada

## Estructura del proyecto

- `index.html`: dashboard principal
- `login.html`: inicio de sesión
- `usuarios.html`: gestión de usuarios
- `ofertas.html`: gestión de ofertas y demandas
- `js/`: lógica JavaScript de la aplicación
- `css/`: estilos propios
- `docs/`: documentación complementaria de la entrega

## Observaciones

Los datos se gestionan en memoria mediante arrays de objetos JavaScript. No existe persistencia real en base de datos, ya que este aspecto se abordará en productos posteriores.