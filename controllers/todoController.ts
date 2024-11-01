import { todos } from "../db.ts";
import { ObjectId } from "@db/mongo";

export async function getTodos(): Promise<Response> {
  console.log("🚀 ~ getTodos ~ getTodos:");
  try {
    const allTodos = await todos.find().toArray();
    console.log("🚀 ~ getTodos ~ allTodos:", allTodos);
    return new Response(JSON.stringify(allTodos), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function addTodo(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const result = await todos.insertOne(body);
    return new Response(JSON.stringify({ id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function getTodo(id: string): Promise<Response> {
  try {
    const todo = await todos.findOne({ _id: new ObjectId(id) });
    if (!todo) {
      return new Response(JSON.stringify({ error: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(todo), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function updateTodo(id: string, req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const result = await todos.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ updated: result.modifiedCount }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function deleteTodo(id: string): Promise<Response> {
  try {
    const result = await todos.deleteOne({ _id: new ObjectId(id) });
    if (result === 0) {
      return new Response(JSON.stringify({ error: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ deleted: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function getIncompleteTodos(): Promise<Response> {
  try {
    const pipeline = [
      { $match: { completed: false } },
      { $count: "incomplete" },
    ];
    const result = await todos.aggregate(pipeline).toArray();
    const incompleteCount = result[0]?.incomplete || 0;
    return new Response(JSON.stringify({ incompleteCount }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
