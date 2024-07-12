import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientData, patientSchema } from "../schemas/patientSchema";
import { addPatient, updatePatient } from "../api/patient.service";
import { FormInput } from "../../../components/form-input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";

interface PatientFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  patient?: PatientData | null;
}

export function PatientFormModal({
  isOpened,
  onClose,
  patient,
}: PatientFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientData>({
    resolver: zodResolver(patientSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: patientForm } = useMutation({
    mutationFn: async (data: PatientData) => {
      if (patient) {
        const updatedPatient = await updatePatient(patient.id!, data);
        return updatedPatient;
      } else {
        const newPatient = await addPatient(data);
        return newPatient;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });

  const onSubmit = async (data: PatientData): Promise<void> => {
    try {
      const patientFormResponse = await patientForm(data);

      if (patientFormResponse.message) {
        toast({
          title: patientFormResponse.message,
          status: "success",
        });
      }

      reset();
      onClose();
    } catch (err: any) {
      if (
        Boolean(err.response?.data) &&
        typeof err.response.data.message === "string"
      ) {
        toast({ title: err.response.data.message, status: "error" });
      } else {
        toast({
          title: "Erro desconhecido",
          description: "Por favor envie o formulário novamente.",
          status: "error",
        });
      }
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    const fetchPatientData = async () => {
      if (patient) {
        setValue("name", patient.name);
      } else {
        reset();
      }
    };

    fetchPatientData();
  }, [patient, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {patient ? `Editar paciente` : "Adicionar paciente"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="name"
            label="Nome"
            required
            placeholder="Informe a posição"
          />

          <DialogFooter className="!flex !w-full !justify-between items-center">
            <span className="text-sm text-zinc-700">Campos obrigatórios *</span>
            <div className="flex gap-2">
              <Button
                className="bg-opacity-0 text-black border-[1px] border-black hover:bg-zinc-200 transition-all"
                onClick={onClose}
                type="button"
              >
                Cancelar
              </Button>
              <Button type="submit" onClick={() => console.log(errors)}>
                Salvar
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
