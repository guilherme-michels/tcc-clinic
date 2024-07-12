import { Route } from "react-router-dom";
import { StockPage } from "./StockPage";

export function StockRoutes() {
  return [<Route key="stock" path="/stock" element={<StockPage />} />];
}
