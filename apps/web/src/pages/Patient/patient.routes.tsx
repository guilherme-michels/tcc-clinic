import { Route } from "react-router-dom";
import { PatientsPage } from "./PatientsPage";
import { PatientPage } from "./PatientPage";

export function PatientRoutes() {
  return [
    <Route key="container" path="/patients" element={<PatientsPage />} />,
    <Route key="container" path="/patients/1" element={<PatientPage />} />,
  ];
}
