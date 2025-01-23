import { z } from "zod";

export const updateListSchema = z.object({
  listName: z.string({ required_error: "Required" }).min(1).max(100),
  listIcon: z.string().optional(),
  listId: z.string(),
  userId: z.string(),
});
