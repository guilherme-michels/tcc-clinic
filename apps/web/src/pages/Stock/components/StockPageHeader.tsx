import { Box, List, Table } from "lucide-react";
import { PageHeader } from "../../../components/page-header/page-header";

const stockItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function StockPageHeader() {
  return (
    <PageHeader
      items={stockItems}
      pageHeaderTitle="Estoque"
      pageIcon={<Box />}
    />
  );
}
