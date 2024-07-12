import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import StockHeader from "./StockHeader";
import { StockTabs } from "./StockTabs";
import { StockPageHeader } from "./components/StockPageHeader";

export function StockPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Estoque", link: "/stock" },
  ];

  return (
    <SidebarTemplate>
      <StockPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <StockHeader />

          <StockTabs />
        </div>
      </div>
    </SidebarTemplate>
  );
}
