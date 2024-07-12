import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { PatientData } from "../schemas/patientSchema";
import { Link } from "react-router-dom";
import { ContactButton } from "../../../components/contact-button";

interface PatientDetailsProps {
  patient: PatientData;
  onClose: () => void;
}

export function PatientCardDetails({ patient, onClose }: PatientDetailsProps) {
  return (
    <Card className="relative max-w-md mx-auto">
      <CardHeader className="pb-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <X size={14} />
        </button>
        <Link to="/patient/1">
          <CardTitle className="text-xl font-semibold hover:text-zinc-600 transition-all cursor-pointer">
            Guilherme Michels
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-zinc-600">
          Cadastrado em setembro de 2021
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1 text-sm">
        <div className="flex items-center justify-center">
          <div className="h-36 w-36 bg-black rounded-full"></div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          <span className="font-semibold">Nome:</span>
          <span>{patient.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold">Idade:</span>
          <span>22</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold">Email:</span>
          <span>guilherme.michels@universo.univates.br</span>
        </div>
      </CardContent>
      <CardFooter className="grid w-full grid-cols-2 gap-12">
        <ContactButton type="whatsapp" />
        <ContactButton type="email" />
      </CardFooter>
    </Card>
  );
}
