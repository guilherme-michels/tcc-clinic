import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { StockData, stockSchema } from "../schemas/stockSchema";
import { addStock, updateStock } from "../api/stock.service";
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

interface StockFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  stock?: StockData | null;
}

export function StockFormModal({
  isOpened,
  onClose,
  stock,
}: StockFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StockData>({
    resolver: zodResolver(stockSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: stockForm } = useMutation({
    mutationFn: async (data: StockData) => {
      if (stock) {
        const updatedStock = await updateStock(stock.id!, {
          productId: data.productId,
          quantity: data.quantity,
        });
        return updatedStock;
      } else {
        const newStock = await addStock({
          productId: data.productId,
          quantity: data.quantity,
        });
        return newStock;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const onSubmit = async (data: StockData): Promise<void> => {
    try {
      const stockFormResponse = await stockForm(data);

      if (stockFormResponse.message) {
        toast({
          title: stockFormResponse.message,
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
      if (stock) {
        setValue("productId", String(stock.productId));
        setValue("quantity", stock.quantity);
      } else {
        reset();
      }
    };

    fetchStockData();
  }, [stock, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {stock ? `Editar estoque` : "Adicionar estoque"}
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            name="productId"
            label="Produto"
            required
            placeholder="Informe o produto"
          />

          <FormInput
            control={control}
            name="quantity"
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
