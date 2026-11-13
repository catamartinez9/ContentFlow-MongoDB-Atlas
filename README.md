
# ContentFlow - API REST

## Descripción del proyecto

ContentFlow es una API REST desarrollada con Python y FastAPI, conectada a MongoDB Atlas.

Su objetivo es administrar información de usuarios y publicaciones mediante operaciones CRUD.

## Tecnologías utilizadas

- Python
- FastAPI
- MongoDB Atlas
- PyMongo
- Uvicorn
- Pydantic

## Base de datos

Nombre: ContentFlowDB

Colecciones:
- usuarios
- publicaciones
- reacciones
- comentarios
- campanas

## Funciones de la API

### Usuarios
- GET /usuarios: consultar usuarios.
- POST /usuarios: registrar usuarios.
- PUT /usuarios/{usuario_id}: actualizar dispositivo.
- DELETE /usuarios/{usuario_id}: eliminar usuarios.

### Publicaciones
- GET /publicaciones: consultar publicaciones.
- POST /publicaciones: registrar publicaciones.
- PUT /publicaciones/{publicacion_id}: actualizar contenido.
- DELETE /publicaciones/{publicacion_id}: eliminar publicaciones.

## Instalación

1. Instalar Python.
2. Abrir la carpeta ContentFlow_API.
3. Instalar las dependencias:

   py -m pip install -r requirements.txt

4. Crear un archivo .env utilizando .env.example
   como referencia.
5. Configurar la conexión privada de MongoDB Atlas.

## Ejecución

Ejecutar:

   py -m uvicorn main:app --reload

Abrir en el navegador:

   http://127.0.0.1:8000/docs

## Validaciones

Se realizaron pruebas de:
- Código 201: creación correcta.
- Código 200: actualización y eliminación.
- Código 400: identificador incorrecto.
- Código 404: usuario inexistente.
- Código 422: correo electrónico inválido.

## Seguridad

Las credenciales se almacenan en un archivo .env,
que no debe publicarse ni incluirse en la entrega.

El archivo .env.example contiene únicamente
valores de ejemplo.
