import { z } from "zod";

export const taskFormSchema = z.object({
  path: z.string(),
  name: z
    .string()
    .min(1, { message: "Please enter at least one character" })
    .max(100, { message: "only 100 characters allowed" }),
  date: z.date().optional(),
  dynamicPath: z.string(),
  userId: z.string(),
  listId: z.string().optional(),
});
