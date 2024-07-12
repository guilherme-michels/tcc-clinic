import { z } from "zod";

export const patientSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string({
    required_error: "Preencha este campo",
  }),
  mail: z.string({
    required_error: "Preencha este campo",
  }),
  cpf: z.string({
    required_error: "Preencha este campo",
  }),
  age: z.number({
    required_error: "Preencha este campo",
  }),
  phone: z.string({
    required_error: "Preencha este campo",
  }),
});

export type PatientData = z.infer<typeof patientSchema>;
