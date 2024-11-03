import "@std/dotenv/load";

import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
import { poweredBy } from "@hono/hono/powered-by";
import { initORM, Services } from "./plugins/mikro-orm.plugin.ts";
import todos from "./todos/todo.controller.ts";

const PORT = Deno.env.get("API_PORT") || 3000;

const app = new Hono();

export let db: Services;

app.use("*", logger(), poweredBy());
app.get("/", (c) => {
  return c.text("Hello Deno!");
});

app.route("/api/todos", todos);

const init = async () => {
  db = await initORM();
  console.log("Connected to MongoDB!");

  Deno.serve({ port: +PORT }, app.fetch);
};

init().catch(console.error);
