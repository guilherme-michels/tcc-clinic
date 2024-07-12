import { Route } from "react-router-dom";
import { ProductPage } from "./ProductPage";

export function ProductRoutes() {
  return [<Route key="product" path="/products" element={<ProductPage />} />];
}
