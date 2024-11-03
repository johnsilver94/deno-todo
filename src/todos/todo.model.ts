import { model, Schema } from "mongoose";
import { BaseModel } from "../shared/models/base.model.ts";

export type TodoModel = BaseModel & {
  title: string;
  description: string;
  completed: boolean;
};

const todoSchema = new Schema<TodoModel>({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<TodoModel>("Todo", todoSchema);
