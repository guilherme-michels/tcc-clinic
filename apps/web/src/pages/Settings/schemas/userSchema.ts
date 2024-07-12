import { z } from "zod";

export const userSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string({
    required_error: "Preencha este campo",
  }),
});

export type UserData = z.infer<typeof userSchema>;
