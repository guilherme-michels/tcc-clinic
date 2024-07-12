import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { StockFormModal } from "./components/StockFormModal";
import { useState } from "react";
import { ProductFormModal } from "../Product/components/ProductFormModal";

export default function StockHeader() {
  const [isStockFormModalVisible, setIsStockFormModalVisible] = useState(false);
  const [isProductFormModalVisible, setIsProductFormModalVisible] =
    useState(false);

  return (
    <div className="w-full grid grid-cols-10 gap-4">
      <Card className="col-span-2 h-full">
        <CardHeader className="pb-3">
          <CardTitle>Estoque</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Informações do estoque
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button onClick={() => setIsStockFormModalVisible(true)}>
            Cadastrar item no estoque
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Itens cadastrados</CardDescription>
          <CardTitle className="text-4xl">344</CardTitle>
        </CardHeader>
      </Card>

      <Card className="col-span-2 h-full">
        <CardHeader className="pb-2">
          <CardDescription>Valor do estoque</CardDescription>
          <CardTitle className="text-4xl">R$ 1,329</CardTitle>
        </CardHeader>
      </Card>

      <Card className="col-span-2 h-full">
        <CardHeader className="pb-3">
          <CardTitle>Produtos</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Cadastre algum produto
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button onClick={() => setIsProductFormModalVisible(true)}>
            Cadastrar produto novo
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Tipos de produtos cadastrados</CardDescription>
          <CardTitle className="text-4xl">13</CardTitle>
        </CardHeader>
      </Card>

      <StockFormModal
        isOpened={isStockFormModalVisible}
        onClose={() => setIsStockFormModalVisible(false)}
      />

      <ProductFormModal
        isOpened={isProductFormModalVisible}
        onClose={() => setIsProductFormModalVisible(false)}
      />
    </div>
  );
}
