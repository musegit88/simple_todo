import { z } from "zod";

export const createListSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1).max(100),
  icon: z.string().optional(),
  color: z.string().optional(),
  userId: z.string(),
});
