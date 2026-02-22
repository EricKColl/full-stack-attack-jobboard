# Definición de interfaces - JobConnect (Producto 1)

## Interfaz 1: Dashboard principal (`index.html`)
### Objetivo
Mostrar un resumen visual de ofertas y demandas de empleo.

### Elementos
- Barra de navegación (Bootstrap)
  - Logo / nombre de la app
  - Enlaces: Dashboard, Login, Ofertas/Demandas, Usuarios
  - Zona de usuario logueado (correo si existe login)
- Cabecera principal (hero)
  - Título de la app
  - Subtítulo descriptivo
- Resumen rápido (cards)
  - Número de ofertas
  - Número de demandas
  - Número de usuarios registrados
- Listado de tarjetas de publicaciones
  - Tarjetas de ofertas (color distintivo)
  - Tarjetas de demandas (color distintivo)
  - Información resumida:
    - Título
    - Tipo (oferta/demanda)
    - Categoría
    - Ubicación
    - Descripción breve
    - Fecha (simulada)
- Footer básico

### Comportamiento JS esperado
- Cargar datos desde `datos.js`
- Renderizar dinámicamente tarjetas
- Mostrar estadísticas resumidas

---

## Interfaz 2: Login (`login.html`)
### Objetivo
Permitir el acceso al prototipo comprobando email y contraseña desde datos en memoria.

### Elementos
- Barra de navegación
- Título de pantalla
- Formulario de login
  - Email
  - Contraseña
  - Botón "Iniciar sesión"
- Mensajes de estado
  - Login correcto
  - Error de credenciales
- Zona de ayuda (texto informativo del prototipo)

### Comportamiento JS esperado
- Capturar submit del formulario
- Validar que el usuario existe en el array de usuarios (`datos.js`)
- Si login correcto:
  - Guardar usuario logueado (temporal, en memoria o `localStorage` opcional)
  - Mostrar email en navegación
- Si login incorrecto:
  - Mostrar mensaje de error

---

## Interfaz 3: Gestión de ofertas y demandas (`ofertas-demandas.html`)
### Objetivo
Crear, listar y eliminar ofertas o demandas de empleo.

### Elementos
- Barra de navegación
- Formulario de alta
  - Tipo (oferta / demanda)
  - Título
  - Categoría profesional
  - Empresa o persona
  - Ubicación
  - Descripción
  - Email de contacto
  - Botón "Guardar"
- Tabla o listado de publicaciones registradas
  - Columnas recomendadas:
    - ID
    - Tipo
    - Título
    - Categoría
    - Ubicación
    - Contacto
    - Acción (Eliminar)

### Comportamiento JS esperado
- Alta de publicación en array de `datos.js`
- Renderizado dinámico del listado
- Eliminación de publicaciones
- Uso de listeners y manipulación del DOM

---

## Interfaz 4: Gestión de usuarios (`usuarios.html`)
### Objetivo
Registrar, visualizar y eliminar usuarios del sistema (prototipo).

### Elementos
- Barra de navegación
- Formulario de alta de usuario
  - Nombre
  - Apellidos
  - Email
  - Contraseña
  - Rol (candidato / empresa)
  - Botón "Crear usuario"
- Tabla de usuarios
  - ID
  - Nombre completo
  - Email
  - Rol
  - Acción (Eliminar)

### Comportamiento JS esperado
- Alta de usuarios en array de `datos.js`
- Mostrar listado de usuarios
- Eliminar usuario
- Validaciones básicas de formulario

---

## Requisitos técnicos del producto 1
- HTML5 + CSS3 + Bootstrap
- JavaScript básico (sin frameworks JS)
- Datos comunes en un único fichero `datos.js`
- Programación modular (import/export)
- Sin persistencia real (todo en memoria)