import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import ProductArchive from "./components/ProductArchive";
import ProductDetails from "./components/ProductDetails";
import ProductImages from "./components/ProductImages";
import ProductStatus from "./components/ProductStatus";
import ProductStock from "./components/ProductStock";

export function ProductPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Estoque", link: "/stock" },
    { name: "Produto 001", link: "" },
  ];

  return (
    <SidebarTemplate>
      <Breadcrumb options={options} />

      <div className="grid grid-cols-3 2xl:grid-cols-5 gap-4">
        <div className="flex flex-col gap-4 col-span-3">
          <ProductDetails />

          <ProductStock />
        </div>

        <div className="flex flex-col gap-4 col-span-1">
          <ProductStatus />

          <ProductArchive />
        </div>

        <div className="flex flex-col gap-4 col-span-1">
          <ProductImages />
        </div>
      </div>
    </SidebarTemplate>
  );
}
