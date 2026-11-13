
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

```javascript
// Procedimiento de importación original
//
// Herramienta: MongoDB Atlas / Compass
// Base de datos: ContentFlowDB
//
// Se importaron los archivos JSON del anexo
// a las siguientes colecciones:
//
// usuarios       -> usuarios.json
// publicaciones  -> publicaciones.json
// reacciones     -> reacciones.json
// comentarios    -> comentarios.json
// campanas       -> campañas.json
//
// Cada archivo contiene un arreglo JSON.
// Se conservaron los identificadores _id originales.
//
// La importación ya fue realizada.
// No se vuelve a ejecutar para evitar duplicados.
```
