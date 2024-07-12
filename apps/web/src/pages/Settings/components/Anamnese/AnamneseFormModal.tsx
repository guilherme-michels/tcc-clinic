import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../../components/form-input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../components/ui/use-toast";
import { AnamneseData, anamneseSchema } from "../../schemas/anamneseSchema";
import { addAnamnese, updateAnamnese } from "../../api/anamnese.service";

interface AnamneseFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  anamnese?: AnamneseData | null;
}

export function AnamneseFormModal({
  isOpened,
  onClose,
  anamnese,
}: AnamneseFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnamneseData>({
    resolver: zodResolver(anamneseSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: anamneseForm } = useMutation({
    mutationFn: async (data: AnamneseData) => {
      if (anamnese) {
        const updatedAnamnese = await updateAnamnese(anamnese.id!, {
          name: data.name,
        });
        return updatedAnamnese;
      } else {
        const newPlan = await addAnamnese({
          name: data.name,
        });
        return newPlan;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const onSubmit = async (data: AnamneseData): Promise<void> => {
    try {
      const planFormResponse = await anamneseForm(data);

      if (planFormResponse.message) {
        toast({
          title: planFormResponse.message,
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
    const feetchAnamneseData = async () => {
      if (anamnese) {
        setValue("name", String(anamnese.name));
      } else {
        reset();
      }
    };

    feetchAnamneseData();
  }, [anamnese, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {anamnese ? `Editar anamnese` : "Adicionar anamnese"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="name"
            label="Nome"
            required
            placeholder="Informe o nome"
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
