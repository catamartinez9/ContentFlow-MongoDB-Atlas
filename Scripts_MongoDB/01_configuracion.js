
```javascript
// Proyecto ContentFlow - MongoDB Atlas
// Script 01: Configuración de la base de datos

// Seleccionar la base de datos
use("ContentFlowDB");

// Mostrar las colecciones existentes
print("Colecciones de ContentFlowDB:");
printjson(db.getCollectionNames());

// Comprobar la cantidad de documentos
const colecciones = [
  "usuarios",
  "publicaciones",
  "reacciones",
  "comentarios",
  "campanas"
];

colecciones.forEach((nombre) => {
  const total = db.getCollection(nombre).countDocuments({});
  print(nombre + ": " + total + " documentos");
});
```
