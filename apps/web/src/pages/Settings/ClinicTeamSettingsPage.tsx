import { useState } from "react";
import { Breadcrumb } from "../../components/breadcrumb";
import { SidebarTemplate } from "../../template/SidebarTemplate";
import { SettingsTabs } from "./components/SettingsTabs";
import { TeamUserSettingsModal } from "./components/Team/TeamUserSettingsModal/TeamUserSettingsModal";
import { TeamUserCard } from "./components/Team/TeamUserCard";
import TeamHeader from "./components/Team/TeamHeader";
import { Searchable } from "../../components/searchable";
import { ExportCSV } from "../../components/export-csv";
import { TeamPageHeader } from "./components/Team/TeamPageHeader";

export function ClinicTeamSettingsPage() {
  const options = [
    { name: "Página inicial", link: "/" },
    { name: "Configurações da clínica", link: "/settings" },
    { name: "Minha equipe", link: "/settings/team" },
  ];

  const [isTeamUserSettingsModalVisible, setIsTeamUserSettingsModalVisible] =
    useState(false);

  return (
    <SidebarTemplate>
      <TeamPageHeader />

      <div className="p-4">
        <Breadcrumb options={options} />

        <div className="flex flex-col gap-4">
          <TeamHeader />

          <div className="w-full items-center flex justify-between">
            <SettingsTabs />
            <div className="flex gap-4">
              <Searchable />
              <ExportCSV />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <TeamUserCard
              onClick={() => setIsTeamUserSettingsModalVisible(true)}
            />

            <TeamUserCard
              onClick={() => setIsTeamUserSettingsModalVisible(true)}
            />
          </div>
        </div>
      </div>

      <TeamUserSettingsModal
        isOpened={isTeamUserSettingsModalVisible}
        onClose={() => setIsTeamUserSettingsModalVisible(false)}
      />
    </SidebarTemplate>
  );
}
