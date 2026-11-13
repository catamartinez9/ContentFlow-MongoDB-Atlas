
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 05: Agregaciones de MongoDB

// 1. Contar publicaciones por categoría
print("PUBLICACIONES POR CATEGORÍA");

printjson(
  db.publicaciones.aggregate([
    {
      $group: {
        _id: "$categoria",
        total: { $sum: 1 }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]).toArray()
);

// 2. Contar reacciones por tipo
print("REACCIONES POR TIPO");

printjson(
  db.reacciones.aggregate([
    {
      $group: {
        _id: "$tipo",
        total: { $sum: 1 }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]).toArray()
);

// 3. Agrupar comentarios según sus likes
print("COMENTARIOS CON MÁS LIKES");

printjson(
  db.comentarios.aggregate([
    {
      $match: { likes: { $gt: 0 } }
    },
    {
      $sort: { likes: -1 }
    },
    {
      $limit: 10
    }
  ]).toArray()
);


```javascript
// 4. Relacionar publicaciones con sus autores
// Negocio: identificar quién crea cada contenido.

print("PUBLICACIONES CON SUS AUTORES");

printjson(
  db.publicaciones.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "usuario_id",
        foreignField: "_id",
        as: "autor"
      }
    },
    { $unwind: "$autor" },
    {
      $project: {
        _id: 1,
        categoria: 1,
        nombre_autor: "$autor.nombre"
      }
    },
    { $limit: 10 }
  ]).toArray()
);
```
