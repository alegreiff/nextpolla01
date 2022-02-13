import { connectToDatabase } from "./db";

async function usuarioGoogleToMongo(nombre, correo, proveedor) {
  if (!nombre || !correo.includes("@")) {
    client.close();
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const existingUSer = await db.collection("users").findOne({ email: correo });

  if (existingUSer) {
    client.close();
    console.log("El muchacho ya existe");
    return;
  }

  const result = await db.collection("users").insertOne({
    email: correo,
    nombre,
    proveedor,
    accesos: 0,
  });
  console.log("El resultado es", result);
}

export default usuarioGoogleToMongo;
