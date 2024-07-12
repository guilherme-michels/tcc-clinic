import { List, Table, Users } from "lucide-react";
import { PageHeader } from "../../../components/page-header/page-header";

const patientsItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function PatientsPageHeader() {
  return (
    <PageHeader
      items={patientsItems}
      pageHeaderTitle="Pacientes"
      pageIcon={<Users />}
    />
  );
}
