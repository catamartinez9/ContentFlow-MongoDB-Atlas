
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 07: Operaciones CRUD
// Ejemplos de inserción, consulta,
// actualización y eliminación.

// IMPORTANTE:
// Estas operaciones son ejemplos para documentar
// el procedimiento. No ejecutarlas todavía.

// CREATE: insertar un usuario de prueba
function crearUsuarioPrueba() {
  return db.usuarios.insertOne({
    nombre: "Usuario Prueba",
    correo: "prueba.contentflow@example.com"
  });
}

// READ: consultar el usuario de prueba
function consultarUsuarioPrueba() {
  return db.usuarios.findOne({
    correo: "prueba.contentflow@example.com"
  });
}

// UPDATE: modificar el nombre del usuario
function actualizarUsuarioPrueba() {
  return db.usuarios.updateOne(
    { correo: "prueba.contentflow@example.com" },
    { $set: { nombre: "Usuario Actualizado" } }
  );
}

// DELETE: eliminar el usuario de prueba
function eliminarUsuarioPrueba() {
  return db.usuarios.deleteOne({
    correo: "prueba.contentflow@example.com"
  });
}

// Las funciones no se ejecutan automáticamente.
// Solo se ejecutarán cuando se invoquen.
