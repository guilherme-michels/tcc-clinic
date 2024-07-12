import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct } from "../IProduct";
import { ProductData, productSchema } from "../schemas/productSchema";
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
import { addProduct, updateProduct } from "../api/product.service";

interface ProductFormModalProps {
  isOpened: boolean;
  onClose: () => void;
  product?: IProduct | null;
}

export function ProductFormModal({
  isOpened,
  onClose,
  product,
}: ProductFormModalProps) {
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: productForm } = useMutation({
    mutationFn: async (data: ProductData) => {
      if (product) {
        const updatedProduct = await updateProduct(product.id!, data);
        return updatedProduct;
      } else {
        const newProduct = await addProduct(data);
        return newProduct;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const onSubmit = async (data: ProductData): Promise<void> => {
    try {
      const productFormResponse = await productForm(data);

      if (productFormResponse.message) {
        toast({
          title: productFormResponse.message,
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
    const fetchProductData = async () => {
      if (product) {
        setValue("name", product.name);
      } else {
        reset();
      }
    };

    fetchProductData();
  }, [product, setValue, reset]);

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold flex flex-col text-xl">
            {product ? `Editar produto` : "Adicionar produto"}
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
