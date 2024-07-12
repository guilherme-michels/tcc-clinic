import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../../../components/ui/card";

export function PatientsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center justify-between">
          <span>Pacientes</span>
          <Link
            to="/patients"
            className="text-blue-600 cursor-pointer hover:text-blue-500 transition-all"
          >
            Ver mais
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col"></CardContent>
    </Card>
  );
}
