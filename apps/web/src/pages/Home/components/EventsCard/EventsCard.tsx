import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../../../components/ui/card";
import { EventItem } from "./EventItem";
import { SimplifiedEventData } from "./simplifiedEventSchema";

const events: SimplifiedEventData = [
  { id: 1, time: "09:00", title: "Reunião com a equipe" },
  { id: 2, time: "11:00", title: "Revisão de projeto" },
  { id: 3, time: "14:00", title: "Almoço com cliente" },
  { id: 4, time: "16:00", title: "Apresentação de resultados" },
];

export function EventsCard() {
  const morningEvents = events.filter((event) => {
    const hour = parseInt(event.time.split(":")[0], 10);
    return hour < 12;
  });

  const afternoonEvents = events.filter((event) => {
    const hour = parseInt(event.time.split(":")[0], 10);
    return hour >= 12;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center justify-between">
          <span>Compromissos diário</span>
          <Link
            to="/calendar"
            className="text-blue-600 cursor-pointer hover:text-blue-500 transition-all"
          >
            Ver mais
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col max-h-[400px] min-h-[400px] overflow-auto overflow-x-hidden">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm text-zinc-700 mb-2">Manhã</h3>
          {morningEvents.map((event) => (
            <EventItem key={event.id} time={event.time} title={event.title} />
          ))}
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm text-zinc-700 mb-2">Tarde</h3>
          {afternoonEvents.map((event) => (
            <EventItem key={event.id} time={event.time} title={event.title} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
