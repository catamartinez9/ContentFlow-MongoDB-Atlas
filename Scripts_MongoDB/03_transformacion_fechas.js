
use("ContentFlowDB");

// Proyecto ContentFlow
// Script 03: Transformación y verificación de fechas
// Colección: usuarios
// Campo confirmado: fecha_registro

// Convierte únicamente las fechas que todavía
// estén guardadas como texto.
db.usuarios.updateMany(
  {
    fecha_registro: { $type: "string" }
  },
  [
    {
      $set: {
        fecha_registro: {
          $toDate: "$fecha_registro"
        }
      }
    }
  ]
);

// Verificar cuántos documentos tienen
// fecha_registro en formato BSON Date.
print("Fechas convertidas correctamente:");

print(
  db.usuarios.countDocuments({
    fecha_registro: { $type: "date" }
  })
);


```javascript
// Transformación de fechas en publicaciones
// Campo: fecha_publicacion

db.publicaciones.updateMany(
  {
    fecha_publicacion: { $type: "string" }
  },
  [
    {
      $set: {
        fecha_publicacion: {
          $toDate: "$fecha_publicacion"
        }
      }
    }
  ]
);

// Verificar fechas en formato Date
print("Fechas correctas en publicaciones:");

print(
  db.publicaciones.countDocuments({
    fecha_publicacion: { $type: "date" }
  })
);
```

```javascript
// Transformación de fechas en reacciones
// Campo: fecha

db.reacciones.updateMany(
  {
    fecha: { $type: "string" }
  },
  [
    {
      $set: {
        fecha: {
          $toDate: "$fecha"
        }
      }
    }
  ]
);

// Verificar las fechas convertidas
print("Fechas correctas en reacciones:");

print(
  db.reacciones.countDocuments({
    fecha: { $type: "date" }
  })
);
```

```javascript
// Transformación de fechas en comentarios
// Campo: fecha

db.comentarios.updateMany(
  {
    fecha: { $type: "string" }
  },
  [
    {
      $set: {
        fecha: {
          $toDate: "$fecha"
        }
      }
    }
  ]
);

// Verificar fechas en formato Date
print("Fechas correctas en comentarios:");

print(
  db.comentarios.countDocuments({
    fecha: { $type: "date" }
  })
);
```

```javascript
// Transformación de fechas en campañas
// Campos: fecha_inicio y fecha_fin

db.campanas.updateMany(
  {
    $or: [
      { fecha_inicio: { $type: "string" } },
      { fecha_fin: { $type: "string" } }
    ]
  },
  [
    {
      $set: {
        fecha_inicio: {
          $convert: {
            input: "$fecha_inicio",
            to: "date",
            onError: "$fecha_inicio",
            onNull: "$fecha_inicio"
          }
        },
        fecha_fin: {
          $convert: {
            input: "$fecha_fin",
            to: "date",
            onError: "$fecha_fin",
            onNull: "$fecha_fin"
          }
        }
      }
    }
  ]
);

// Verificar fechas correctas
print("Fechas de inicio correctas:");
print(db.campanas.countDocuments({
  fecha_inicio: { $type: "date" }
}));

print("Fechas de fin correctas:");
print(db.campanas.countDocuments({
  fecha_fin: { $type: "date" }
}));
```

