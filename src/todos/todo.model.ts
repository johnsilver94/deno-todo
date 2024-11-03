import { BaseModel } from "../shared/models/base.model.ts";

export type TodoModel = BaseModel & {
  title: string;
  description: string;
  completed: boolean;
};
