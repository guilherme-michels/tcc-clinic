import { List, Table, User } from "lucide-react";
import { PageHeader } from "../../../components/page-header/page-header";

const patientItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function PacientPageHeader() {
  return (
    <PageHeader
      items={patientItems}
      pageHeaderTitle="Paciente"
      pageIcon={<User />}
    />
  );
}
