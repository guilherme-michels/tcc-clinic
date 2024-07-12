import { Calendar, List, Table } from "lucide-react";
import { PageHeader } from "../../../../components/page-header/page-header";

const clinicItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function ClinicPageHeader() {
  return (
    <PageHeader
      items={clinicItems}
      pageHeaderTitle="Clínica"
      pageIcon={<Calendar />}
    />
  );
}
