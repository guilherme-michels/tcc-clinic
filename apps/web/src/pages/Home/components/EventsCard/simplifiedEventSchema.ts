import { z } from "zod";

export const simplifiedEventSchema = z.object({
  id: z.number(),
  time: z.string(),
  title: z.string(),
});

export type SimplifiedEventData = z.infer<typeof simplifiedEventSchema>[];
