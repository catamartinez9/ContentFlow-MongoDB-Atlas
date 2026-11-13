
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

try:
    cliente = MongoClient(
        os.getenv("MONGO_URI"),
        serverSelectionTimeoutMS=10000
    )

    cliente.admin.command("ping")

    base_datos = cliente[os.getenv("MONGO_DB")]

    print("Conexión exitosa con MongoDB Atlas")
    print("Base de datos:", base_datos.name)
    print("Colecciones:", base_datos.list_collection_names())

    cliente.close()

except Exception as error:
    print("Error de conexión:", type(error).__name__)
    print("Revisa la URI, las credenciales y el acceso de red en Atlas.")
