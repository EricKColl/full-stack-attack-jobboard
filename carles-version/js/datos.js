/*
==============================================
DATOS DE EJEMPLO DE LA APLICACIÓN
==============================================

Este archivo contiene datos simulados para poder
desarrollar el frontend sin base de datos.

Los datos se almacenan en arrays de objetos JavaScript.

En productos posteriores estos datos podrán venir
de una API o base de datos real.
*/


/*
==============================================
ARRAY DE USUARIOS
==============================================
*/

window.usuarios = [

    {
        id: 1,
        nombre: "Carles",
        email: "carles@email.com",
        password: "1234",
        rol: "candidato"
    },

    {
        id: 2,
        nombre: "EmpresaDeloitte",
        email: "empresa@demo.com",
        password: "abcd",
        rol: "empresa"
    }

];


/*
==============================================
ARRAY DE PUBLICACIONES
==============================================

Cada publicación puede ser:
- oferta de empleo
- demanda de empleo

Se diferencian mediante la propiedad "tipo".
*/

window.publicaciones = [

    {
        id: 1,
        tipo: "oferta",
        titulo: "Prácticas Frontend",
        autor: "TechStart",
        ubicacion: "Barcelona",
        descripcion: "Buscamos estudiante con ganas de aprender"
    },

    {
        id: 2,
        tipo: "demanda",
        titulo: "Busco prácticas de desarrollo web",
        autor: "Laura Gómez",
        ubicacion: "Barcelona",
        descripcion: "Estudiante DAW con interés en frontend"
    }

];