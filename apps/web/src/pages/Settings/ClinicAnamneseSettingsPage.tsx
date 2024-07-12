import { Breadcrumb } from "../../components/breadcrumb";
import { ExportCSV } from "../../components/export-csv";
import { Searchable } from "../../components/searchable";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import AnamneseHeader from "./components/Anamnese/AnamneseHeader";
import { AnamnesePageHeader } from "./components/Anamnese/AnamnesePageHeader";
import { AnamneseTable } from "./components/Anamnese/AnamneseTable";
import { SettingsTabs } from "./components/SettingsTabs";

export function ClinicAnamneseSettingsPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Configurações da clínica", link: "/settings" },
    { name: "Anamnese", link: "/settings/anamnese" },
  ];

  return (
    <SidebarTemplate>
      <AnamnesePageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <AnamneseHeader />

          <div className="flex flex-col gap-2">
            <div className="w-full items-center flex justify-between">
              <SettingsTabs />
              <div className="flex gap-4">
                <Searchable />
                <ExportCSV />
              </div>
            </div>

            <AnamneseTable />
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
