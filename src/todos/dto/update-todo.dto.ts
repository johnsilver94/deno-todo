import { CreateTodoDto } from "./create-todo.dto.ts";

export const UpdateTodoDto = CreateTodoDto.partial();
