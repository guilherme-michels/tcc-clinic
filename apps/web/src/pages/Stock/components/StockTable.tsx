import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DeleteModal } from "../../../components/delete-modal";
import { useToast } from "../../../components/ui/use-toast";
import { DataTable } from "../../../components/ui/data-table";
import { DropDownTable } from "../../../components/drop-down-table";
import { deleteStock, getFakeStocks } from "../api/stock.service";
import { StockFormModal } from "./StockFormModal";
import { StockData } from "../schemas/stockSchema";

export function StockTable() {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isStockFormModalVisible, setIsStockFormModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

  const { data: stockData, refetch } = useQuery({
    queryKey: [
      "stock",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakeStocks(),
  });

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPageIndex.toString());
    setSearchParams(params.toString());
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteResponse = await deleteStock(id);

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

  const columns: ColumnDef<StockData>[] = [
    {
      accessorKey: "product.name",
      header: "Nome do Produto",
      meta: "Nome do Produto",
      enableHiding: false,
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
      meta: "Quantidade",
      enableHiding: false,
    },
    {
      id: "actions",
      header: "Ações",
      meta: "Ações",
      cell: ({ row }) => {
        const stock = row.original as StockData;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedStock(stock);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedStock(stock);
              setIsStockFormModalVisible(true);
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
        data={stockData?.stocks || []}
        dateFilter={false}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="productName"
      />

      <DeleteModal
        isOpened={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        confirmDelete={() => handleDelete(selectedStock!.id!)}
        name={"a"}
      />

      <StockFormModal
        isOpened={isStockFormModalVisible}
        onClose={() => setIsStockFormModalVisible(false)}
        stock={selectedStock}
      />
    </>
  );
}
