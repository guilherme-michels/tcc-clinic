import { useState } from "react";
import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import { PatientCardDetails } from "./components/PatientCardDetails";
import { PatientTable } from "./components/PatientTable";
import { PatientData } from "./schemas/patientSchema";
import { PatientHeaderCard } from "./components/PatientHeaderCard";
import { PatientFormModal } from "./components/PatientFormModal";
import { PatientsPageHeader } from "./components/PatientsPageHeader";

export function PatientsPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Pacientes", link: "/" },
  ];

  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );
  const [isPatientFormModalVisible, setIsPatientFormModalVisible] =
    useState(false);

  return (
    <SidebarTemplate>
      <PatientsPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-flow-row grid-cols-6">
            <PatientHeaderCard
              onOpenModal={() => setIsPatientFormModalVisible(true)}
            />
          </div>
          <div className="w-full flex gap-4">
            <div className="w-full ease-in-out">
              <PatientTable
                onChangeSelectedInfo={(patient) => setSelectedPatient(patient)}
              />
            </div>

            {selectedPatient && (
              <div className="w-[20%] min-w-[400px]">
                <PatientCardDetails
                  patient={selectedPatient}
                  onClose={() => setSelectedPatient(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <PatientFormModal
        isOpened={isPatientFormModalVisible}
        onClose={() => setIsPatientFormModalVisible(false)}
      />
    </SidebarTemplate>
  );
}
