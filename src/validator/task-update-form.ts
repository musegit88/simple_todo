import { z } from "zod";

export const taskUpdateFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter at least one character" })
    .max(100, { message: "only 100 characters allowed" }),
  date: z.date().optional(),
  description: z.string().max(255).optional(),
  taskId: z.string(),
  userId: z.string(),
});
