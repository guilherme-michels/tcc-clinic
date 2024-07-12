import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import { PermissionItem } from "./PermissionItem";
import { Button } from "../../../../../components/ui/button";

interface PermissionCardProps {
  group: string;
  icon: ReactNode;
  items: { id: number; name: string }[];
}

export function PermissionCard({ group, items, icon }: PermissionCardProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={group}>
        <AccordionTrigger>
          <span className="flex items-center gap-2 text-base font-normal">
            {icon} {group}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {items.map((item) => (
              <PermissionItem key={item.id} item={item} />
            ))}
          </ul>

          <div className="flex w-full py-4 items-center justify-between">
            <div />

            <Button className="h-8 px-2">Desmarcar todos</Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
