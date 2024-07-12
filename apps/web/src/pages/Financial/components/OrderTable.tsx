import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DeleteModal } from "../../../components/delete-modal";
import { useToast } from "../../../components/ui/use-toast";
import { DataTable } from "../../../components/ui/data-table";
import { DropDownTable } from "../../../components/drop-down-table";
import { deleteOrder, getFakeOrders } from "../api/financial.service";
import { OrderData } from "../schemas/orderSchema";
import { OrderFormModal } from "./OrderFormModal";
import { Badge } from "../../../components/ui/badge";

interface OrderTableProps {
  onChangeSelectedInfo: (order: OrderData) => void;
}

export function OrderTable({ onChangeSelectedInfo }: OrderTableProps) {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isStockFormModalVisible, setIsStockFormModalVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const { data: orderData, refetch } = useQuery({
    queryKey: [
      "order",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakeOrders(),
  });

  const handlePageChange = (newPageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPageIndex.toString());
    setSearchParams(params.toString());
  };

  const handleDelete = async (id: number) => {
    try {
      const deleteResponse = await deleteOrder(id);

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

  const columns: ColumnDef<OrderData>[] = [
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
      header: "Tipo",
      meta: "Tipo",
      enableHiding: false,
      cell: () => {
        return (
          <span className="bg-green-600 px-2 rounded-xl text-white">
            Entrada
          </span>
        );
      },
    },
    {
      header: "Status",
      meta: "Status",
      enableHiding: false,
      cell: () => {
        return <Badge className="bg-zinc-700">Finalizado</Badge>;
      },
    },
    {
      header: "Data",
      meta: "Data",
      enableHiding: false,
      cell: () => {
        return <span>20/05/2024</span>;
      },
    },
    {
      header: "Valor",
      meta: "Valor",
      enableHiding: false,
      cell: () => {
        return <span>R$ 250,00</span>;
      },
    },
    {
      id: "actions",
      header: "Ações",
      meta: "Ações",
      cell: ({ row }) => {
        const stock = row.original as OrderData;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedOrder(stock);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedOrder(stock);
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
        data={orderData?.orders || []}
        dateFilter={false}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="productName"
        getRowProps={(row) => ({
          onClick: () => {
            onChangeSelectedInfo(row);
            setSelectedOrder(row);
          },
          style: {
            cursor: "pointer",
            backgroundColor: selectedOrder?.id === row.id ? "#f0f0f0" : "white",
          },
        })}
      />

      <DeleteModal
        isOpened={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        confirmDelete={() => handleDelete(selectedOrder!.id!)}
        name={"a"}
      />

      <OrderFormModal
        isOpened={isStockFormModalVisible}
        onClose={() => setIsStockFormModalVisible(false)}
        order={selectedOrder}
      />
    </>
  );
}
