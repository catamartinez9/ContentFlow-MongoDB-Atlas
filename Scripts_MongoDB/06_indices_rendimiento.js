
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 06: Índices y análisis de rendimiento

// Consultar los índices existentes
print("ÍNDICES DE PUBLICACIONES");
printjson(db.publicaciones.getIndexes());

print("ÍNDICES DE COMENTARIOS");
printjson(db.comentarios.getIndexes());

// Crear índices si todavía no existen
db.publicaciones.createIndex({ categoria: 1 });
db.comentarios.createIndex({ likes: 1 });

// Analizar el rendimiento de las consultas
print("RENDIMIENTO: PUBLICACIONES");
printjson(
  db.publicaciones
    .find({ categoria: "Tecnología" })
    .explain("executionStats")
);

print("RENDIMIENTO: COMENTARIOS");
printjson(
  db.comentarios
    .find({ likes: { $gt: 10 } })
    .explain("executionStats")
);
