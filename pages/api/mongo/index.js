import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //const { title, image, adress, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://alegreiff:$Santafe13@cluster0.adfkw.mongodb.net/pollatempo?retryWrites=true&w=majority"
    );
    const db = client.db();
    const pollatempoCollection = db.collection("primeradb");
    const result = await pollatempoCollection.insertOne({ data });
    console.log("jaimedegris", result);
    client.close();
    res.status(201).json({ message: "Insertau" });
  }
}

export default handler;
