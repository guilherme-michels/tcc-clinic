import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageHeaderItemProps {
  icon: ReactNode;
  title: string;
  url: string;
}

export function PageHeaderItem({ icon, title, url }: PageHeaderItemProps) {
  return (
    <Link
      to={url}
      className="flex items-center gap-1 text-sm text-zinc-900 pt-1 border-b-4 cursor-pointer border-transparent hover:border-zinc-300 hover:text-black transition-all hover:bg-white hover:bg-opacity-20 px-2 rounded-t-md"
    >
      {icon}
      {title}
    </Link>
  );
}
