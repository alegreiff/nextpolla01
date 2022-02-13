import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  const proveedor = "Nuestra Polla";
  const data = req.body;
  const { email, password } = data;
  console.log(data);
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "malos datos de creación de usuario" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const existingUSer = await db.collection("users").findOne({ email: email });

  if (existingUSer) {
    res
      .status(422)
      .json({ message: "Ya existe", proveedor: existingUSer.proveedor });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  console.log("PASS", hashedPassword);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    proveedor,
    accesos: 0,
  });

  res.status(201).json({ message: "User created" });
  client.close();
}

export default handler;
