import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { AnamneseData } from "../../schemas/anamneseSchema";
import { useToast } from "../../../../components/ui/use-toast";
import { DeleteModal } from "../../../../components/delete-modal";
import { DataTable } from "../../../../components/ui/data-table";
import { DropDownTable } from "../../../../components/drop-down-table";
import { getFakeAnamneses } from "../../api/anamnese.service";

export function AnamneseTable() {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedAnamnese] = useState<AnamneseData | null>(
    null
  );
  // const [totalPages, setTotalPages] = useState<number | null>(1);
  // const [pageIndex, setPageIndex] = useState<number>(1);

  const { data: productData, refetch } = useQuery({
    queryKey: [
      "product",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakeAnamneses(),
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

  const columns: ColumnDef<AnamneseData>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      meta: "Nome",
      enableHiding: false,
      cell: ({ row }) => {
        const plan = row.original as AnamneseData;
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
        const anamnese = row.original as AnamneseData;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedAnamnese(anamnese);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedAnamnese(anamnese);
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
        data={productData?.anamneses || []}
        dateFilter={false}
        // pageIndex={pageIndex}
        // totalPages={totalPages}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="name"
        // getRowProps={(row) => ({
        //   onClick: () => {
        //     onChangeSelectedInfo(row);
        //     setSelectedAnamnese(row);
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
