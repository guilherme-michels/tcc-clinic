import { z } from "zod";

export const permissionSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string({
    required_error: "Preencha este campo",
  }),
  description: z.string({
    required_error: "Preencha este campo",
  }),
});

export type PermissionData = z.infer<typeof permissionSchema>;
