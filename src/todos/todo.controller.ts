import { Context, Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { ByIdDto } from "../shared/dto/by-id.dto.ts";
import { CreateTodoDto } from "./dto/create-todo.dto.ts";
import { UpdateTodoDto } from "./dto/update-todo.dto.ts";
import { todoCollection } from "../plugins/mongo.plugin.ts";
import { ObjectId } from "@db/mongo";

const app = new Hono();

app.get("/", async (c: Context) => {
  const todos = await todoCollection.find({}).toArray();
  return c.json(
    todos.map(({ _id, __v, ...todo }) => ({ id: _id, ...todo })),
    200
  );
});
app.get("/:id", zValidator("param", ByIdDto), async (c: Context) => {
  const { id } = c.req.valid("param");
  const todo = await todoCollection.findOne({ _id: new ObjectId(id) });

  if (!todo) {
    throw new HTTPException(404, {
      message: "Todo with this id does not exists",
    });
  }

  const { _id, __v, ...todoData } = todo;

  return c.json({ id: _id, ...todoData }, 200);
});
app.post("/", zValidator("json", CreateTodoDto), async (c: Context) => {
  const { title, description, completed } = c.req.valid("json");
  const insertedId = await todoCollection.insertOne({
    title,
    description,
    completed,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const newTodo = await todoCollection.findOne({ _id: insertedId });

  if (!newTodo) {
    throw new HTTPException(404, {
      message: "Todo with this id does not exists",
    });
  }

  const { _id, __v, ...todoData } = newTodo;

  return c.json({ id: _id, ...todoData }, 201);
});

app.patch(
  "/:id",
  zValidator("param", ByIdDto),
  zValidator("json", UpdateTodoDto),
  async (c: Context) => {
    const { id } = c.req.valid("param");
    const updateTodoData = c.req.valid("json");
    console.log("🚀 ~ updateTodoData:", updateTodoData, id);
    const { matchedCount, modifiedCount, upsertedId } =
      await todoCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateTodoData }
      );

    console.log("🚀 ~ updatedTodo:", matchedCount, modifiedCount);

    if (!matchedCount) {
      console.info("No todo found");
    }

    if (modifiedCount === 0) {
      console.info("No changes were made");
    }

    if (upsertedId) {
      console.info("Todo was upserted");
    }

    const updatedTodo = await todoCollection.findOne({ _id: new ObjectId(id) });

    if (!updatedTodo) {
      throw new HTTPException(404, {
        message: "Todo with this id does not exists",
      });
    }

    const { _id, __v, ...todoData } = updatedTodo;

    return c.json({ id: _id, ...todoData }, 200);
  }
);

app.delete("/:id", zValidator("param", ByIdDto), async (c: Context) => {
  const { id } = c.req.valid("param");

  const deletedCount = await todoCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deletedCount) {
    throw new HTTPException(404, {
      message: "Todo with this id does not exists",
    });
  }

  return c.json({ success: true }, 200);
});

export default app;
