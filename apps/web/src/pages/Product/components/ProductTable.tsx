import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DeleteModal } from "../../../components/delete-modal";
import { useToast } from "../../../components/ui/use-toast";
import { DataTable } from "../../../components/ui/data-table";
import { DropDownTable } from "../../../components/drop-down-table";
import { IProduct } from "../IProduct";
import { deleteProduct, getFakeProducts } from "../api/product.service";
import { ProductFormModal } from "./ProductFormModal";

export function ProductTable() {
  const { toast } = useToast();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isProductFormModalVisible, setIsProductFormModalVisible] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  // const [totalPages, setTotalPages] = useState<number | null>(1);
  // const [pageIndex, setPageIndex] = useState<number>(1);

  const { data: productData, refetch } = useQuery({
    queryKey: [
      "product",
      { page: Number(searchParams.get("page")) || 1, limit: 10 },
    ],
    queryFn: () => getFakeProducts(),
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
      const deleteResponse = await deleteProduct(id);

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

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      meta: "Nome",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original as IProduct;
        return (
          <Link to="/product" className="hover:font-bold transition-all">
            {product.name}
          </Link>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      meta: "Ações",
      cell: ({ row }) => {
        const product = row.original as IProduct;
        return (
          <DropDownTable
            onDelete={() => {
              setSelectedProduct(product);
              setIsDeleteModalVisible(true);
            }}
            onEdit={() => {
              setSelectedProduct(product);
              setIsProductFormModalVisible(true);
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
        data={productData?.products || []}
        dateFilter={false}
        // pageIndex={pageIndex}
        // totalPages={totalPages}
        onPageChange={handlePageChange}
        canFilterColumns={false}
        columnToSearch="name"
        // getRowProps={(row) => ({
        //   onClick: () => {
        //     onChangeSelectedInfo(row);
        //     setSelectedProduct(row);
        //   },
        //   style: {
        //     cursor: "pointer",
        //     backgroundColor:
        //       selectedProduct?.id === row.id ? "#f0f0f0" : "white",
        //   },
        // })}
      />

      <DeleteModal
        isOpened={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        confirmDelete={() => handleDelete(selectedProduct!.id!)}
        name={"a"}
      />

      <ProductFormModal
        isOpened={isProductFormModalVisible}
        onClose={() => setIsProductFormModalVisible(false)}
        product={selectedProduct}
      />
    </>
  );
}
