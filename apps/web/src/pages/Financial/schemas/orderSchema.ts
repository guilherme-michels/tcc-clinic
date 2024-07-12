import { z } from "zod";

export const orderSchema = z.object({
  id: z.number().nullable().optional(),
});

export type OrderData = z.infer<typeof orderSchema>;
