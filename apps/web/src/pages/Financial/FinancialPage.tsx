import { useState } from "react";
import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import OrderCardDetails from "./components/OrderCardDetails";
import { OrderTable } from "./components/OrderTable";
import { OrderHeaderCard } from "./components/OrderHeaderCard";
import { OrderData } from "./schemas/orderSchema";
import { OrderTabs } from "./components/OrderTabs";
import { Searchable } from "../../components/searchable";
import { ExportCSV } from "../../components/export-csv";
import { FinancialPageHeader } from "./components/FinancialPageHeader";

export function FinancialPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Financeiro", link: "/" },
  ];

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  return (
    <SidebarTemplate>
      <FinancialPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-flow-row grid-cols-6 gap-4">
            <div className="col-span-2">
              <OrderHeaderCard
                addButton
                value="Suas transferências"
                description="Apresentando nosso painel dinâmico de transferências para gerenciamento contínuo e análise criteriosa."
              />
            </div>
            <OrderHeaderCard
              progressPercentage={25}
              description="+25% em relação à semana passada"
              title="Essa semana"
              value="R$ 15.250,20"
            />

            <OrderHeaderCard
              progressPercentage={40}
              description="+25% em relação ao mês passado"
              title="Esse mês"
              value="R$ 43.112,40"
            />
          </div>
          <div className="w-full flex gap-4">
            <div className="w-full ease-in-out gap-2 flex flex-col">
              <div className="w-full items-center flex justify-between">
                <OrderTabs />
                <div className="flex gap-4">
                  <Searchable />
                  <ExportCSV />
                </div>
              </div>
              <OrderTable
                onChangeSelectedInfo={(order) => setSelectedOrder(order)}
              />
            </div>

            {selectedOrder && (
              <div className="w-[20%] min-w-[400px]">
                <OrderCardDetails onClose={() => setSelectedOrder(null)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
