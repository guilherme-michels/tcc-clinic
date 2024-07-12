import { Star } from "lucide-react";
import { PageHeaderItem } from "./page-header-item";
import { ReactNode } from "react";

interface PageHeaderProps {
  pageHeaderTitle: string;
  pageIcon: ReactNode;
  items: {
    icon: ReactNode;
    title: string;
    url: string;
  }[];
}

export function PageHeader({
  items,
  pageHeaderTitle,
  pageIcon,
}: PageHeaderProps) {
  return (
    <div className="h-[72px] w-full bg-[#998D7F] flex items-center shadow-sm shadow-zinc-700">
      <div className="flex items-center px-6 w-full h-full">
        <div
          className={`h-[50px] w-[50px] rounded-xl flex items-center justify-center bg-white`}
        >
          {pageIcon}
        </div>

        <div className="flex flex-col px-4 w-full h-full">
          <strong className="text-[20px] mt-2 flex items-center gap-2 text-zinc-900">
            {pageHeaderTitle}
            <Star size={20} className="mt-1 cursor-pointer" />
          </strong>
          <div className="w-full mt-auto flex gap-2">
            {items.map((item, index) => (
              <PageHeaderItem
                key={index}
                icon={item.icon}
                title={item.title}
                url={item.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
