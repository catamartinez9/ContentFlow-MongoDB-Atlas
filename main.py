
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId

load_dotenv()

app = FastAPI(
    title="ContentFlow API",
    description="API REST conectada a MongoDB Atlas",
    version="1.0.0"
)

cliente = MongoClient(
    os.getenv("MONGO_URI"),
    serverSelectionTimeoutMS=10000
)

db = cliente[os.getenv("MONGO_DB")]

@app.get("/")
def inicio():
    return {
        "mensaje": "Bienvenido a ContentFlow API",
        "estado": "Funcionando correctamente"
    }

@app.get("/usuarios")
def obtener_usuarios():
    try:
        usuarios = list(db.usuarios.find().limit(20))

        for usuario in usuarios:
            usuario["_id"] = str(usuario["_id"])

        return {
            "total": len(usuarios),
            "usuarios": usuarios
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al consultar los usuarios"
        )


@app.get("/publicaciones")
def obtener_publicaciones():
    try:
        publicaciones = list(db.publicaciones.find().limit(20))

        for publicacion in publicaciones:
            publicacion["_id"] = str(publicacion["_id"])

        return {
            "total": len(publicaciones),
            "publicaciones": publicaciones
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al consultar las publicaciones"
        )


class UsuarioNuevo(BaseModel):
    nombre: str
    correo: EmailStr
    pais: str
    dispositivo: str


@app.post("/usuarios", status_code=201)
def crear_usuario(usuario: UsuarioNuevo):
    try:
        datos = usuario.model_dump()

        resultado = db.usuarios.insert_one(datos)

        return {
            "mensaje": "Usuario registrado correctamente",
            "id": str(resultado.inserted_id)
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al registrar el usuario"
        )


from pydantic import Field

class ActualizarDispositivo(BaseModel):
    dispositivo: str = Field(min_length=1)


@app.put("/usuarios/{usuario_id}")
def actualizar_usuario(usuario_id: str, datos: ActualizarDispositivo):
    try:
        resultado = db.usuarios.update_one(
            {"_id": ObjectId(usuario_id)},
            {"$set": {"dispositivo": datos.dispositivo}}
        )

        if resultado.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Usuario no encontrado"
            )

        return {
            "mensaje": "Usuario actualizado correctamente",
            "modificados": resultado.modified_count
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="No se pudo actualizar el usuario. Verifica el ID."
        )


@app.delete("/usuarios/{usuario_id}")
def eliminar_usuario(usuario_id: str):
    if not ObjectId.is_valid(usuario_id):
        raise HTTPException(
            status_code=400,
            detail="El ID no tiene un formato válido"
        )

    try:
        resultado = db.usuarios.delete_one(
            {"_id": ObjectId(usuario_id)}
        )

        if resultado.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Usuario no encontrado"
            )

        return {
            "mensaje": "Usuario eliminado correctamente",
            "eliminados": resultado.deleted_count
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al eliminar el usuario"
        )


from pydantic import Field

class PublicacionNueva(BaseModel):
    categoria: str = Field(min_length=1)
    tipo: str = Field(min_length=1)
    contenido: str = Field(min_length=1)


@app.post("/publicaciones", status_code=201)
def crear_publicacion(publicacion: PublicacionNueva):
    try:
        datos = publicacion.model_dump()

        resultado = db.publicaciones.insert_one(datos)

        return {
            "mensaje": "Publicación registrada correctamente",
            "id": str(resultado.inserted_id)
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al registrar la publicación"
        )


class ActualizarPublicacion(BaseModel):
    contenido: str = Field(min_length=1)


@app.put("/publicaciones/{publicacion_id}")
def actualizar_publicacion(
    publicacion_id: str,
    datos: ActualizarPublicacion
):
    if not ObjectId.is_valid(publicacion_id):
        raise HTTPException(
            status_code=400,
            detail="El ID de la publicación no es válido"
        )

    try:
        resultado = db.publicaciones.update_one(
            {"_id": ObjectId(publicacion_id)},
            {"$set": {"contenido": datos.contenido}}
        )

        if resultado.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Publicación no encontrada"
            )

        return {
            "mensaje": "Publicación actualizada correctamente",
            "modificados": resultado.modified_count
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al actualizar la publicación"
        )

@app.delete("/publicaciones/{publicacion_id}")
def eliminar_publicacion(publicacion_id: str):
    if not ObjectId.is_valid(publicacion_id):
        raise HTTPException(
            status_code=400,
            detail="El ID de la publicación no es válido"
        )

    try:
        resultado = db.publicaciones.delete_one(
            {"_id": ObjectId(publicacion_id)}
        )

        if resultado.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Publicación no encontrada"
            )

        return {
            "mensaje": "Publicación eliminada correctamente",
            "eliminados": resultado.deleted_count
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error al eliminar la publicación"
        )
