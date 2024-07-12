import { Upload } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function ProductImages() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Imagens do produto</CardTitle>
        <CardDescription>
          Cadastre aqui, imagens referentes ao produto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="aspect-square w-full rounded-md object-cover bg-red-600 h-60" />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <div className="aspect-square w-full rounded-md object-cover bg-red-600" />
            </button>
            <button>
              <div className="aspect-square w-full rounded-md object-cover  bg-red-600" />
            </button>
            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
