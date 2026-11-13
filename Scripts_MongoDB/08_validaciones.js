
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 08: Validaciones de datos

// 1. Revisar la configuración de validación
// de la colección usuarios.
print("VALIDACIÓN DE USUARIOS");

const informacion = db.getCollectionInfos({
  name: "usuarios"
});

printjson(informacion);

// 2. Buscar usuarios sin nombre o correo.
print("USUARIOS CON CAMPOS FALTANTES");

printjson(
  db.usuarios.find({
    $or: [
      { nombre: { $exists: false } },
      { correo: { $exists: false } }
    ]
  }).limit(10).toArray()
);

// 3. Buscar correos repetidos.
print("CORREOS DUPLICADOS");

printjson(
  db.usuarios.aggregate([
    {
      $match: {
        correo: { $type: "string" }
      }
    },
    {
      $group: {
        _id: "$correo",
        total: { $sum: 1 }
      }
    },
    {
      $match: {
        total: { $gt: 1 }
      }
    }
  ]).toArray()
);


```javascript
// Buscar publicaciones cuyo autor no existe.
// Solo consulta: no modifica ni elimina documentos.

print("PUBLICACIONES SIN USUARIO VÁLIDO");

printjson(
  db.publicaciones.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "usuario_id",
        foreignField: "_id",
        as: "usuario_encontrado"
      }
    },
    {
      $match: {
        usuario_encontrado: { $size: 0 }
      }
    },
    {
      $project: {
        _id: 1,
        usuario_id: 1,
        categoria: 1
      }
    },
    { $limit: 20 }
  ]).toArray()
);
```

