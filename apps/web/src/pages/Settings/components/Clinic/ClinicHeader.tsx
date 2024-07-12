import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

export default function ClinicHeader() {
  return (
    <div className="w-full grid grid-cols-10 gap-4">
      <Card className="col-span-2 h-full">
        <CardHeader className="pb-3">
          <CardTitle>Minha clínica</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Informações da clínica
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button>Convidar um profissional</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
