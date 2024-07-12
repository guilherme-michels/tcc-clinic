import { Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface PatientHeaderCardProps {
  onOpenModal: () => void;
}

export function PatientHeaderCard({ onOpenModal }: PatientHeaderCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-2">
          <Users />
          127
        </CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Pacientes cadastrados
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <Button onClick={onOpenModal}>+ Cadastrar paciente</Button>
      </CardContent>
    </Card>
  );
}
