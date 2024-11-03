import { Context, Hono } from "@hono/hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../main.ts";
import { ByIdDto } from "../shared/dto/by-id.dto.ts";
import { CreateTodoDto } from "./dto/create-todo.dto.ts";
import { UpdateTodoDto } from "./dto/update-todo.dto.ts";

const app = new Hono();

app.get("/", async (c: Context) => {
  const todos = await db.todo.findAll({});
  return c.json(todos);
});
app.get("/:id", zValidator("param", ByIdDto), async (c: Context) => {
  const { id } = c.req.valid("param");
  const todo = await db.todo.findOneOrFail(id);
  if (!todo) {
    return c.json({ message: "Todo not found" }, 404);
  }
  return c.json(todo);
});
app.post("/", zValidator("json", CreateTodoDto), async (c: Context) => {
  const createTodoData = c.req.valid("json");
  const todo = await db.todo.create(createTodoData, { partial: true });

  await db.em.flush();

  return c.json(todo);
});

app.patch(
  "/:id",
  zValidator("param", ByIdDto),
  zValidator("json", UpdateTodoDto),
  async (c: Context) => {
    const { id } = c.req.valid("param");
    const updateTodoData = c.req.valid("json");
    console.log("🚀 ~ updateTodoData:", updateTodoData);

    const todo = await db.todo.findOneOrFail(id);
    console.log("🚀 ~ todo:", todo);

    if (!todo) {
      return c.json({ message: "Todo not found" }, 404);
    }

    db.em.assign(todo, updateTodoData, { merge: true });
    await db.em.flush();

    return c.json(todo);
  }
);

export default app;
