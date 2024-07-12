import { Calendar, Users } from "lucide-react";
import { PermissionCard } from "./PermissionsCard";

const permissions = [
  {
    group: "Agenda",
    icon: <Calendar size={20} />,
    items: [
      { id: 1, name: "Criar compromissos para outros profissionais" },
      { id: 2, name: "Excluir consultas" },
      { id: 3, name: "Exportar dados" },
      { id: 4, name: "Fazer atendimentos" },
      { id: 5, name: "Ver consultas de todos os profissionais" },
    ],
  },
  {
    group: "Pacientes",
    icon: <Users size={20} />,
    items: [
      { id: 6, name: "Adicionar pacientes" },
      { id: 7, name: "Excluir pacientes" },
      { id: 8, name: "Exportar dados de pacientes" },
      { id: 9, name: "Ver todos os pacientes" },
    ],
  },
  {
    group: "Pacientes",
    icon: <Users size={20} />,
    items: [
      { id: 6, name: "Adicionar pacientes" },
      { id: 7, name: "Excluir pacientes" },
      { id: 8, name: "Exportar dados de pacientes" },
      { id: 9, name: "Ver todos os pacientes" },
    ],
  },
  {
    group: "Pacientes",
    icon: <Users size={20} />,
    items: [
      { id: 6, name: "Adicionar pacientes" },
      { id: 7, name: "Excluir pacientes" },
      { id: 8, name: "Exportar dados de pacientes" },
      { id: 9, name: "Ver todos os pacientes" },
    ],
  },
];

export function PermissionList() {
  return (
    <div className="max-h-[500px] min-h-[500px] overflow-auto overflow-x-hidden">
      {permissions.map((permissionGroup) => (
        <PermissionCard
          key={permissionGroup.group}
          icon={permissionGroup.icon}
          group={permissionGroup.group}
          items={permissionGroup.items}
        />
      ))}
    </div>
  );
}
