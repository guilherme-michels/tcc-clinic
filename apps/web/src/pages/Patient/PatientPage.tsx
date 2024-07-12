import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import { PatientHeader } from "./components/PatientHeader";
import { PacientPageHeader } from "./components/PatientPageHeader";
import { PatientTabs } from "./components/PatientTabs";

export function PatientPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Pacientes", link: "/patients" },
    { name: "Guilherme Michels", link: "/" },
  ];

  return (
    <SidebarTemplate>
      <PacientPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <PatientHeader />
            <PatientTabs />
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
