import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../../../../components/ui/use-toast";
import { getFakePlans } from "../../api/plan.service";
import { PlanData } from "../../schemas/planSchema";
import { DataTable } from "../../../../components/ui/data-table";
import { DropDownTable } from "../../../../components/drop-down-table";
import { DeleteModal } from "../../../../components/delete-modal";

export function PlanTable() {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPlanFormModalVisible, setIsPlanFormModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  // const [totalPages, setTotalPages] = useState<number | null>(1);
  // const [pageIndex, setPageIndex] = useState<number>(1);

  const { data: productData, refetch } = useQuery({
    queryKey: [
      "product",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakePlans(),
  });

  // useEffect(() => {
  //   if (productData) {
  //     setTotalPages(productData.pageOptions.lastPage);
  //     const page = Number(searchParams.get("page")) || 1;
  //     setPageIndex(page);
  //   }
  // }, [productData, searchParams]);

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPageIndex.toString());
    setSearchParams(params.toString());
  };

  const handleDelete = async (id: number) => {
    try {
      //   const deleteResponse = await deleteProduct(id);

      //   if (deleteResponse.message) {
      //     toast({
      //       title: deleteResponse.message,
      //       status: "success",
      //     });
      //   }

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

  const columns: ColumnDef<PlanData>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      meta: "Nome",
      enableHiding: false,
      cell: ({ row }) => {
        const plan = row.original as PlanData;
        return (
          <Link to="/product" className="hover:font-bold transition-all">
            {plan.name}
          </Link>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      meta: "Ações",
      cell: ({ row }) => {
        const product = row.original as PlanData;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedPlan(product);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedPlan(product);
              setIsPlanFormModalVisible(true);
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
        data={productData?.plans || []}
        dateFilter={false}
        // pageIndex={pageIndex}
        // totalPages={totalPages}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="name"
        // getRowProps={(row) => ({
        //   onClick: () => {
        //     onChangeSelectedInfo(row);
        //     setSelectedPlan(row);
        //   },
        //   style: {
        //     cursor: "pointer",
        //     backgroundColor:
        //       selectedPlan?.id === row.id ? "#f0f0f0" : "white",
        //   },
        // })}
      />

      <DeleteModal
        isOpened={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        confirmDelete={() => handleDelete(selectedPlan!.id!)}
        name={"a"}
      />
    </>
  );
}
