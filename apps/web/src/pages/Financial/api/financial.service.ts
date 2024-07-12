import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { OrderData } from "../schemas/orderSchema";

export function addOrder(order: OrderData): Promise<{
  order: OrderData;
  message: string;
}> {
  return api
    .post<{ message: string; order: OrderData }>("/orders", order)
    .then((res) => res.data);
}

export function updateOrder(
  id: number,
  order: OrderData
): Promise<{
  order: OrderData;
  message: string;
}> {
  return api
    .put<{ message: string; order: OrderData }>(`/orders/${id}`, order)
    .then((res) => res.data);
}

export function getOrders(
  page: number,
  limit: number
): Promise<{
  message: string;
  orders: OrderData[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      orders: OrderData[];
      pageOptions: PageOptions;
    }>("/orders", { params: { page, limit } })
    .then((res) => res.data);
}

export function deleteOrder(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/orders/${id}`)
    .then((res) => res.data);
}

export function getFakeOrders(): Promise<{
  message: string;
  orders: OrderData[];
}> {
  const orders = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "success",
        orders: orders,
      });
    }, 500);
  });
}
