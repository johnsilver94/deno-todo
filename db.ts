import { MongoClient } from "@db/mongo";

const MONGO_DB_URI = Deno.env.get("MONGO_DB_URI") || "";
const MONGO_DB_NAME = Deno.env.get("MONGO_DB_NAME") || "";

if (!MONGO_DB_URI) {
  console.error("MONGO_DB_URI is not set");
  Deno.exit(1);
}

const client = new MongoClient();

try {
  await client.connect(MONGO_DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

const db = client.database(MONGO_DB_NAME);
const todos = db.collection("todos");

export { db, todos };
