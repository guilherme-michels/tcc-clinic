import { BarChart3, List, Table } from "lucide-react";
import { PageHeader } from "../../../components/page-header/page-header";

const dashboardItems = [
  { icon: <Table size={14} />, title: "Visão geral", url: "/overview" },
  { icon: <List size={14} />, title: "Lista", url: "/list" },
];

export function DashboardPageHeader() {
  return (
    <PageHeader
      items={dashboardItems}
      pageHeaderTitle="Dashboard"
      pageIcon={<BarChart3 />}
    />
  );
}
