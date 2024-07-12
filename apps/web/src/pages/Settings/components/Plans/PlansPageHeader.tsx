import { Calendar, List, Table } from "lucide-react";
import { PageHeader } from "../../../../components/page-header/page-header";

const plansItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function PlansPageHeader() {
  return (
    <PageHeader
      items={plansItems}
      pageHeaderTitle="Planos"
      pageIcon={<Calendar />}
    />
  );
}
