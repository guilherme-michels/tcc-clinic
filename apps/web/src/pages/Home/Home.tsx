import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import { EventsCard } from "./components/EventsCard/EventsCard";
import HomeHeader from "./components/HomeHeader";
import { PatientsCard } from "./components/PatientsCard/PatientsCard";

export function HomePage() {
  const options = [{ name: "Página inicial", link: "/" }];
  return (
    <SidebarTemplate>
      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <HomeHeader />
          <div className="flex flex-col gap-2 px-20">
            <div className="w-full grid-cols-2 grid gap-4">
              <EventsCard />
              <PatientsCard />
            </div>
          </div>
        </div>
      </div>
    </SidebarTemplate>
  );
}
