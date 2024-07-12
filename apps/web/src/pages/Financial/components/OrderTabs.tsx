import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";

export function OrderTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabClick = () => {
    if (searchParams) setSearchParams({ page: "1" });
  };

  return (
    <Tabs defaultValue="all" className="col-span-4">
      <TabsList>
        <TabsTrigger value="all" onClick={handleTabClick}>
          Todos
        </TabsTrigger>
        <TabsTrigger value="join" onClick={handleTabClick}>
          Entrada
        </TabsTrigger>
        <TabsTrigger value="exit" onClick={handleTabClick}>
          Saída
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
