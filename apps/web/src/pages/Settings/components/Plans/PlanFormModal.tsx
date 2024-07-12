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
import { PlanData, planSchema } from "../../schemas/planSchema";
import { addPlan, updatePlan } from "../../api/plan.service";

interface PlanFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  plan?: PlanData | null;
}

export function PlanFormModal({ isOpened, onClose, plan }: PlanFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanData>({
    resolver: zodResolver(planSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: planForm } = useMutation({
    mutationFn: async (data: PlanData) => {
      if (plan) {
        const updatedPlan = await updatePlan(plan.id!, {
          name: data.name,
        });
        return updatedPlan;
      } else {
        const newPlan = await addPlan({
          name: data.name,
        });
        return newPlan;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const onSubmit = async (data: PlanData): Promise<void> => {
    try {
      const planFormResponse = await planForm(data);

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
    const fetchPlanData = async () => {
      if (plan) {
        setValue("name", String(plan.name));
      } else {
        reset();
      }
    };

    fetchPlanData();
  }, [plan, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {plan ? `Editar plan` : "Adicionar plan"}
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
