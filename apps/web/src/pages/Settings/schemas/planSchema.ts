import { z } from "zod";

export const planSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string({
    required_error: "Preencha este campo",
  }),
});

export type PlanData = z.infer<typeof planSchema>;
