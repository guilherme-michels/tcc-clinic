import { LockOpen, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

interface TeamUserCardProps {
  onClick: () => void;
}

export function TeamUserCard({ onClick }: TeamUserCardProps) {
  return (
    <Card
      className="hover:cursor-pointer hover:shadow-sm hover:shadow-zinc-600 transition-all"
      onClick={onClick}
    >
      <CardHeader className="pb-3 bg-blue-700">
        <CardDescription className="text-zinc-200">
          guilherme.michels@universo.univates.br
        </CardDescription>
        <CardTitle className="text-white text-xl">Guilherme Michels</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="text-sm text-zinc-800 mt-4 flex items-center gap-2">
          <User size={20} />
          Cirurgião dentista
        </div>
        <div className="text-sm text-zinc-800 mt-4 flex items-center gap-2">
          <LockOpen size={20} />
          58 de 58 permissões
        </div>
      </CardContent>
    </Card>
  );
}
