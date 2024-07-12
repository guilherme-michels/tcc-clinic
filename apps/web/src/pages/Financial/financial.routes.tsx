import { Route } from "react-router-dom";
import { ComissionPage } from "./ComissionPage";
import { FinancialPage } from "./FinancialPage";
import { TicketPage } from "./TicketPage";

export function FinancialRoutes() {
  return [
    <Route key="financial" path="/financial" element={<FinancialPage />} />,
    <Route
      key="financial-comission"
      path="/financial/comission"
      element={<ComissionPage />}
    />,
    <Route
      key="financial-ticket"
      path="/financial/ticket"
      element={<TicketPage />}
    />,
  ];
}
