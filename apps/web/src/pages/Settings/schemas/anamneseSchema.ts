import { z } from "zod";

export const anamneseSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string({
    required_error: "Preencha este campo",
  }),
});

export type AnamneseData = z.infer<typeof anamneseSchema>;
