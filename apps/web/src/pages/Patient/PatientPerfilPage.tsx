import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";

export function PatientPerfilPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Pacientes", link: "/patients" },
    { name: "Guilherme Michels", link: "/" },
  ];

  return (
    <SidebarTemplate>
      <Breadcrumb options={options} />
    </SidebarTemplate>
  );
}
