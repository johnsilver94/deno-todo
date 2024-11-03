import "@std/dotenv/load";

import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
import { poweredBy } from "@hono/hono/powered-by";
import todos from "./todos/todo.controller.ts";

const PORT = Deno.env.get("API_PORT") || 3000;

const app = new Hono();

app.use("*", logger(), poweredBy());
app.get("/", (c) => {
  return c.text("Hello Deno!");
});

app.route("/api/todos", todos);

const init = async () => {
  await Deno.serve({ port: +PORT }, app.fetch);
};

init().catch(console.error);
