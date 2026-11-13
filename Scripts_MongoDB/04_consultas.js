
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 04: Consultas de MongoDB

// 1. Consultar usuarios
print("USUARIOS");
printjson(
  db.usuarios.find(
    {},
    { nombre: 1, correo: 1, _id: 0 }
  ).limit(10).toArray()
);

// 2. Consultar publicaciones
print("PUBLICACIONES");
printjson(
  db.publicaciones.find(
    {},
    { categoria: 1, _id: 0 }
  ).limit(10).toArray()
);

// 3. Ordenar comentarios por cantidad de likes
print("COMENTARIOS ORDENADOS");
printjson(
  db.comentarios.find({})
    .sort({ likes: -1 })
    .limit(10)
    .toArray()
);

// 4. Consultar reacciones
print("REACCIONES");
printjson(
  db.reacciones.find({})
    .limit(10)
    .toArray()
);

// 5. Consultar campañas
print("CAMPANAS");
printjson(
  db.campanas.find({})
    .limit(10)
    .toArray()
);
