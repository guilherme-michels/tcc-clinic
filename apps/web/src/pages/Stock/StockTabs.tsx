import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { ProductTable } from "../Product/components/ProductTable";
import { StockTable } from "./components/StockTable";

export function StockTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabClick = () => {
    if (searchParams) setSearchParams({ page: "1" });
  };

  return (
    <Tabs defaultValue="stock" className="col-span-4">
      <TabsList>
        <TabsTrigger value="stock" onClick={handleTabClick}>
          Estoque
        </TabsTrigger>
        <TabsTrigger value="product" onClick={handleTabClick}>
          Produtos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="stock">
        <StockTable />
      </TabsContent>
      <TabsContent value="product">
        <ProductTable />
      </TabsContent>
    </Tabs>
  );
}
