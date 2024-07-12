import { Checkbox } from "../../../../../components/ui/checkbox";
interface PermissionItemProps {
  item: { id: number; name: string };
}

export function PermissionItem({ item }: PermissionItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Checkbox />
      {item.name}
    </div>
  );
}
