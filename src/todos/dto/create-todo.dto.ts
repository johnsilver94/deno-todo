import { z } from "zod";

export const CreateTodoDto = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean().optional().default(false),
});
