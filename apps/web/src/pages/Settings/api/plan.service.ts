import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { PlanData } from "../schemas/planSchema";

export function addPlan(product: PlanData): Promise<{
  product: PlanData;
  message: string;
}> {
  return api
    .post<{ message: string; product: PlanData }>("/plans", product)
    .then((res) => res.data);
}

export function updatePlan(
  id: number,
  product: PlanData
): Promise<{
  product: PlanData;
  message: string;
}> {
  return api
    .put<{ message: string; product: PlanData }>(`/plans/${id}`, product)
    .then((res) => res.data);
}

export function getPlans(
  page: number,
  limit: number
): Promise<{
  message: string;
  Plans: PlanData[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      Plans: PlanData[];
      pageOptions: PageOptions;
    }>("/plans", { params: { page, limit } })
    .then((res) => res.data);
}

export function deletePlan(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/plans/${id}`)
    .then((res) => res.data);
}

export function getFakePlans(): Promise<{
  message: string;
  plans: PlanData[];
}> {
  const plans = [{ id: 1, name: "Particular" }];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "sucesso",
        plans: plans,
      });
    }, 500);
  });
}
