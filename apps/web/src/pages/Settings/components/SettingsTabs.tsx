import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useEffect, useState } from "react";

export function SettingsTabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("clinic");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/settings/team")) {
      setActiveTab("team");
    } else if (path.includes("/settings/plans")) {
      setActiveTab("plans");
    } else if (path.includes("/settings/anamnese")) {
      setActiveTab("anamnese");
    } else {
      setActiveTab("clinic");
    }
  }, [location.pathname]);

  return (
    <Tabs value={activeTab} className="col-span-4">
      <TabsList>
        <Link to="/settings">
          <TabsTrigger value="clinic">Clínica</TabsTrigger>
        </Link>
        <Link to="/settings/team">
          <TabsTrigger value="team">Minha equipe</TabsTrigger>
        </Link>
        <Link to="/settings/plans">
          <TabsTrigger value="plans">Planos</TabsTrigger>
        </Link>
        <Link to="/settings/anamnese">
          <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
