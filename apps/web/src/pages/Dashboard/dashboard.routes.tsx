import { Route } from "react-router-dom";
import { DashboardPage } from "./DashboardPage";

export function DashboardRoutes() {
  return [
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
  ];
}
