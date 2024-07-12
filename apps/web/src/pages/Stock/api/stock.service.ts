import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { StockData } from "../schemas/stockSchema";

export function addStock(stock: StockData): Promise<{
  stock: StockData;
  message: string;
}> {
  return api
    .post<{ message: string; stock: StockData }>("/stocks", stock)
    .then((res) => res.data);
}

export function updateStock(
  id: number,
  stock: StockData
): Promise<{
  stock: StockData;
  message: string;
}> {
  return api
    .put<{ message: string; stock: StockData }>(`/stocks/${id}`, stock)
    .then((res) => res.data);
}

export function getStocks(
  page: number,
  limit: number
): Promise<{
  message: string;
  stocks: StockData[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      stocks: StockData[];
      pageOptions: PageOptions;
    }>("/stocks", { params: { page, limit } })
    .then((res) => res.data);
}

export function deleteStock(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/stocks/${id}`)
    .then((res) => res.data);
}

export function getFakeStocks(): Promise<{
  message: string;
  stocks: StockData[];
}> {
  const stocks = [
    {
      id: 1,
      product: {
        name: "Teste",
      },
      productId: "1",
      quantity: 10,
    },
    {
      id: 2,
      product: {
        name: "Teste",
      },
      productId: "1",
      quantity: 20,
    },
    {
      id: 3,
      product: {
        name: "Teste",
      },
      productId: "1",
      quantity: 15,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        stocks: stocks,
      });
    }, 500);
  });
}
