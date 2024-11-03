import { z } from "zod";

export const ByIdDto = z.object({
  id: z.string(),
});
