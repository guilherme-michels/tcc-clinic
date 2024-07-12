import { z } from "zod";
import { productSchema } from "../../Product/schemas/productSchema";

export const stockSchema = z.object({
  id: z.number().nullable().optional(),
  productId: z.string({
    required_error: "Preencha este campo",
  }),
  product: productSchema.nullable().optional(),
  quantity: z.number({
    required_error: "Preencha este campo",
  }),
});

export type StockData = z.infer<typeof stockSchema>;
