import { z } from "zod";

export const productSchema = z.object({
  name: z.string({
    required_error: "Preencha este campo",
  }),
});

export type ProductData = z.infer<typeof productSchema>;
