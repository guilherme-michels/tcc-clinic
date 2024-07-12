import { api } from "../../..";
import { PageOptions } from "../../../interfaces/PageOptions";
import { PatientData } from "../schemas/patientSchema";

export function addPatient(patient: PatientData): Promise<{
  patient: PatientData;
  message: string;
}> {
  return api
    .post<{ message: string; patient: PatientData }>("/patients", patient)
    .then((res) => res.data);
}

export function updatePatient(
  id: number,
  branch: PatientData
): Promise<{
  branch: PatientData;
  message: string;
}> {
  return api
    .put<{ message: string; branch: PatientData }>(`/patients/${id}`, branch)
    .then((res) => res.data);
}

export function getPatients(
  page: number,
  limit: number
): Promise<{
  message: string;
  patients: PatientData[];
  pageOptions: PageOptions;
}> {
  return api
    .get<{
      message: string;
      patients: PatientData[];
      pageOptions: PageOptions;
    }>("/patients", { params: { page, limit } })
    .then((res) => res.data);
}

export function deletePatient(id: number): Promise<{
  message: string;
}> {
  return api
    .delete<{ message: string }>(`/patients/${id}`)
    .then((res) => res.data);
}

export function getFakePatients(): Promise<{
  message: string;
  patients: PatientData[];
}> {
  const patients = [
    {
      id: 1,
      name: "Guilherme Michels",
      mail: "guilherme@michels.com",
      age: 23,
      phone: "51 99490889",
      cpf: "05070239007",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "sucesso",
        patients: patients,
      });
    }, 500);
  });
}
