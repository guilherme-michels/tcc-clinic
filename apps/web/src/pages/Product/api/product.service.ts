import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { IProduct } from "../IProduct";

export function addProduct(product: IProduct): Promise<{
  product: IProduct;
  message: string;
}> {
  return api
    .post<{ message: string; product: IProduct }>("/products", product)
    .then((res) => res.data);
}

export function updateProduct(
  id: number,
  product: IProduct
): Promise<{
  product: IProduct;
  message: string;
}> {
  return api
    .put<{ message: string; product: IProduct }>(`/products/${id}`, product)
    .then((res) => res.data);
}

export function getProducts(
  page: number,
  limit: number
): Promise<{
  message: string;
  products: IProduct[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      products: IProduct[];
      pageOptions: PageOptions;
    }>("/products", { params: { page, limit } })
    .then((res) => res.data);
}

export function deleteProduct(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/products/${id}`)
    .then((res) => res.data);
}

export function getFakeProducts(): Promise<{
  message: string;
  products: IProduct[];
}> {
  const products = [
    { id: 1, name: "Guilherme Michels" },
    { id: 2, name: "Guilherme Alberto" },
    { id: 3, name: "José Klak" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "sucesso",
        products: products,
      });
    }, 500);
  });
}
