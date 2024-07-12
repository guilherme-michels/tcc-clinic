interface EventItemProps {
  time: string;
  title: string;
}

export function EventItem({ time, title }: EventItemProps) {
  return (
    <div className="flex justify-between border-[1px] border-zinc-400 p-1 px-4 rounded-xl hover:bg-zinc-100 cursor-pointer transition-all">
      <strong>{time}</strong>
      <span className="text-gray-600 text-sm">{title}</span>
    </div>
  );
}
