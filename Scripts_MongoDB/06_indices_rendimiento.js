
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 06: Comparación de rendimiento

// Consultas utilizadas en la evaluación
const filtroPublicaciones = { categoria: "Deportes" };
const filtroComentarios = { likes: { $gt: 50 } };

// Verificar los índices existentes
print("ÍNDICES DE PUBLICACIONES");
printjson(db.publicaciones.getIndexes());

print("ÍNDICES DE COMENTARIOS");
printjson(db.comentarios.getIndexes());

// Analizar ambas consultas con los índices actuales
print("RENDIMIENTO DE PUBLICACIONES");
printjson(
  db.publicaciones.find(filtroPublicaciones)
    .explain("executionStats")
);

print("RENDIMIENTO DE COMENTARIOS");
printjson(
  db.comentarios.find(filtroComentarios)
    .explain("executionStats")
);


