
```javascript
// Proyecto ContentFlow - MongoDB Atlas
// Script 02: Registro y verificación de importación

// Los archivos JSON originales fueron importados
// mediante la herramienta de importación de MongoDB Atlas.
// Este script verifica el resultado de ese proceso.

use("ContentFlowDB");

const colecciones = [
  "usuarios",
  "publicaciones",
  "reacciones",
  "comentarios",
  "campanas"
];

colecciones.forEach((nombre) => {
  const cantidad = db.getCollection(nombre).countDocuments({});

  print("Colección: " + nombre);
  print("Documentos encontrados: " + cantidad);

  if (cantidad === 500) {
    print("Verificación correcta: 500 documentos.");
  } else {
    print("Revisar cantidad de documentos.");
  }

  print("-----------------------------");
});
```
