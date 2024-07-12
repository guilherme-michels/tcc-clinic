import { Breadcrumb } from "../../components/breadcrumb";
import { ExportCSV } from "../../components/export-csv";
import { Searchable } from "../../components/searchable";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import PlansHeader from "./components/Plans/PlansHeader";
import { PlansPageHeader } from "./components/Plans/PlansPageHeader";
import { PlanTable } from "./components/Plans/PlansTable";
import { SettingsTabs } from "./components/SettingsTabs";

export function ClinicPlansSettingsPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Configurações da clínica", link: "/settings" },
    { name: "Planos", link: "/settings/plans" },
  ];

  return (
    <SidebarTemplate>
      <PlansPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <PlansHeader />

          <div className="flex flex-col gap-4">
            <div className="w-full items-center flex justify-between">
              <SettingsTabs />
              <div className="flex gap-4">
                <Searchable />
                <ExportCSV />
              </div>
            </div>

            <PlanTable />
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
