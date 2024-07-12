import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import { DashboardPageHeader } from "./components/DashboardPageHeader";

export function DashboardPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
  ];

  return (
    <SidebarTemplate>
      <DashboardPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />
      </div>
    </SidebarTemplate>
  );
}
