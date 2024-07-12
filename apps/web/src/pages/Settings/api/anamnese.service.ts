import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { AnamneseData } from "../schemas/anamneseSchema";

export function addAnamnese(product: AnamneseData): Promise<{
  product: AnamneseData;
  message: string;
}> {
  return api
    .post<{ message: string; product: AnamneseData }>("/anamneses", product)
    .then((res) => res.data);
}

export function updateAnamnese(
  id: number,
  product: AnamneseData
): Promise<{
  product: AnamneseData;
  message: string;
}> {
  return api
    .put<{ message: string; product: AnamneseData }>(
      `/anamneses/${id}`,
      product
    )
    .then((res) => res.data);
}

export function getAnamneses(
  page: number,
  limit: number
): Promise<{
  message: string;
  anamneses: AnamneseData[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      anamneses: AnamneseData[];
      pageOptions: PageOptions;
    }>("/anamneses", { params: { page, limit } })
    .then((res) => res.data);
}

export function deleteAnamnese(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/anamneses/${id}`)
    .then((res) => res.data);
}

export function getFakeAnamneses(): Promise<{
  message: string;
  anamneses: AnamneseData[];
}> {
  const anamneses = [{ id: 1, name: "Anamnese adulta" }];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "sucesso",
        anamneses: anamneses,
      });
    }, 500);
  });
}
