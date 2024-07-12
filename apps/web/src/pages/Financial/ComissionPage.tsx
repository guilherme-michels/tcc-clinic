import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";

const options = [
  { name: "Página inicial", link: "/" },
  { name: "Financeiro", link: "/financial" },
  { name: "Comissões", link: "/" },
];

export function ComissionPage() {
  return (
    <SidebarTemplate>
      <Breadcrumb options={options} />
    </SidebarTemplate>
  );
}
