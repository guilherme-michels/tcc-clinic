import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import { PatientDetails } from "./PatientDetails";
import { PatientBudgets } from "./PatientBudgets";
import { PatientTreatments } from "./PatientTreatments";

export function PatientTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabClick = () => {
    if (searchParams) setSearchParams({ page: "1" });
  };

  return (
    <Tabs defaultValue="patient" className="col-span-4">
      <TabsList>
        <TabsTrigger value="patient" onClick={handleTabClick}>
          Paciente
        </TabsTrigger>
        <TabsTrigger value="budget" onClick={handleTabClick}>
          Orçamentos
        </TabsTrigger>
        <TabsTrigger value="treatment" onClick={handleTabClick}>
          Tratamentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="patient">
        <PatientDetails />
      </TabsContent>
      <TabsContent value="budget">
        <PatientBudgets />
      </TabsContent>
      <TabsContent value="treatment">
        <PatientTreatments />
      </TabsContent>
    </Tabs>
  );
}
