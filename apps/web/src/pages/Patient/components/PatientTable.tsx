import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DeleteModal } from "../../../components/delete-modal";
import { useToast } from "../../../components/ui/use-toast";
import { deletePatient, getFakePatients } from "../api/patient.service";
import { DataTable } from "../../../components/ui/data-table";
import { PatientFormModal } from "./PatientFormModal";
import { DropDownTable } from "../../../components/drop-down-table";
import { PatientData } from "../schemas/patientSchema";

interface PatientTableProps {
  onChangeSelectedInfo: (patient: PatientData) => void;
}

export function PatientTable({ onChangeSelectedInfo }: PatientTableProps) {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPatientFormModalVisible, setIsPatientFormModalVisible] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(
    null
  );
  // const [totalPages, setTotalPages] = useState<number | null>(1);
  // const [pageIndex, setPageIndex] = useState<number>(1);

  const { data: patientData, refetch } = useQuery({
    queryKey: [
      "patient",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakePatients(),
  });

  // useEffect(() => {
  //   if (patientData) {
  //     setTotalPages(patientData.pageOptions.lastPage);
  //     const page = Number(searchParams.get("page")) || 1;
  //     setPageIndex(page);
  //   }
  // }, [patientData, searchParams]);

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPageIndex.toString());
    setSearchParams(params.toString());
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteResponse = await deletePatient(id);

      if (deleteResponse.message) {
        toast({
          title: deleteResponse.message,
          status: "success",
        });
      }

      setIsDeleteModalVisible(false);
      refetch();
    } catch (err: any) {
      if (
        Boolean(err.response?.data) &&
        typeof err.response.data.message === "string"
      ) {
        toast({ title: err.response.data.message, status: "error" });
      } else {
        toast({
          title: "Erro desconhecido",
          description: "Por favor tente novamente.",
          status: "error",
        });
      }
    }
  };

  const columns: ColumnDef<PatientData>[] = [
    {
      id: "patientImg",
      header: "",
      cell: () => {
        return <div className="h-10 w-10 rounded-full bg-black" />;
      },
    },
    {
      header: "Cliente",
      meta: "Client",
      enableHiding: false,
      cell: () => {
        return (
          <div className="flex flex-col">
            <strong>Guilherme Michels</strong>
            <span>guilherme.michels@universo.univates.br</span>
          </div>
        );
      },
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      meta: "CPF",
      enableHiding: false,
    },
    {
      accessorKey: "age",
      header: "Idade",
      meta: "Idade",
      enableHiding: false,
    },
    {
      accessorKey: "phone",
      header: "Celular",
      meta: "Celular",
      enableHiding: false,
    },
    {
      id: "actions",
      header: "Ações",
      meta: "Ações",
      cell: ({ row }) => {
        const patient = row.original as PatientData;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedPatient(patient);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedPatient(patient);
              setIsPatientFormModalVisible(true);
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={patientData?.patients || []}
        dateFilter={false}
        // pageIndex={pageIndex}
        // totalPages={totalPages}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="name"
        getRowProps={(row) => ({
          onClick: () => {
            onChangeSelectedInfo(row);
            setSelectedPatient(row);
          },
          style: {
            cursor: "pointer",
            backgroundColor:
              selectedPatient?.id === row.id ? "#f0f0f0" : "white",
          },
        })}
      />

      <DeleteModal
        isOpened={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        confirmDelete={() => handleDelete(selectedPatient!.id!)}
        name={"a"}
      />

      <PatientFormModal
        isOpened={isPatientFormModalVisible}
        onClose={() => setIsPatientFormModalVisible(false)}
        patient={selectedPatient}
      />
    </>
  );
}
