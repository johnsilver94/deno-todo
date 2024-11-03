import "@std/dotenv/load";

import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
import { poweredBy } from "@hono/hono/powered-by";
import mongoose from "mongoose";
import Todo from "./todos/todo.model.ts";

const PORT = 3000;
const MONGODB_CONNECTION = Deno.env.get("MONGODB_CONNECTION") || "";
console.log("🚀 ~ MONGODB_CONNECTION:", MONGODB_CONNECTION);
mongoose.connect(MONGODB_CONNECTION).then(() => console.log("Connected!"));

// Check to see connection status.
console.log(mongoose.connection.readyState);

const app = new Hono();

app.use("*", logger(), poweredBy());
app.get("/", (c) => {
  return c.text("Hello Deno!");
});
app.get("/api/todos", async (c) => {
  const todos = await Todo.find({});
  console.log("🚀 ~ app.get ~ todos:", todos);
});

Deno.serve({ port: PORT }, app.fetch);
