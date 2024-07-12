import { Breadcrumb } from "../../components/breadcrumb";
import { ExportCSV } from "../../components/export-csv";
import { Searchable } from "../../components/searchable";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import ClinicHeader from "./components/Clinic/ClinicHeader";
import { ClinicPageHeader } from "./components/Clinic/ClinicPageHeader";
import { SettingsTabs } from "./components/SettingsTabs";

export function ClinicSettingsPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Configurações da clínica", link: "/settings" },
  ];

  return (
    <SidebarTemplate>
      <ClinicPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <ClinicHeader />

          <div className="w-full items-center flex justify-between">
            <SettingsTabs />
            <div className="flex gap-4">
              <Searchable />
              <ExportCSV />
            </div>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
