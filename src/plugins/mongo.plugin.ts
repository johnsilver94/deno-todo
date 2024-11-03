import { MongoClient } from "@db/mongo";
import { TodoModel } from "../todos/todo.model.ts";

const MONGODB_CONNECTION = Deno.env.get("MONGODB_CONNECTION") || "";
const MONGODB_NAME = Deno.env.get("MONGODB_NAME") || "";

if (!MONGODB_CONNECTION) {
  console.error("MONGODB_CONNECTION is not set");
  Deno.exit(1);
}

const client = new MongoClient();

try {
  await client.connect(MONGODB_CONNECTION);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

const db = client.database(MONGODB_NAME);
const todoCollection = db.collection<TodoModel>("todos");

export { db, todoCollection };
