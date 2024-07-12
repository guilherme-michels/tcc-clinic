import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { OrderData, orderSchema } from "../schemas/orderSchema";
import { addOrder, updateOrder } from "../api/financial.service";

interface OrderFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  order?: OrderData | null;
}

export function OrderFormModal({
  isOpened,
  onClose,
  order,
}: OrderFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: orderForm } = useMutation({
    mutationFn: async (data: OrderData) => {
      if (order) {
        const updatedStock = await updateOrder(order.id!, data);
        return updatedStock;
      } else {
        const newStock = await addOrder(data);
        return newStock;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const onSubmit = async (data: OrderData): Promise<void> => {
    try {
      const orderFormResponse = await orderForm(data);

      if (orderFormResponse.message) {
        toast({
          title: orderFormResponse.message,
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
    const fetchStockData = async () => {
      if (order) {
        setValue("id", order.id!);
      } else {
        reset();
      }
    };

    fetchStockData();
  }, [order, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {order ? `Editar transferencia` : "Adicionar transferencia"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="id"
            label="Quantidade"
            required
            placeholder="Informe a quantidade em estoque"
            type="number"
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
