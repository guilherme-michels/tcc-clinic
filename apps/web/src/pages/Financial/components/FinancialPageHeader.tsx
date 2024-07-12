import { DollarSign, List, Table } from "lucide-react";
import { PageHeader } from "../../../components/page-header/page-header";

const financialItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function FinancialPageHeader() {
  return (
    <PageHeader
      items={financialItems}
      pageHeaderTitle="Financeiro"
      pageIcon={<DollarSign />}
    />
  );
}
