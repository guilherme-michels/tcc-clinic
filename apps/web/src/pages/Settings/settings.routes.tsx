import { Route } from "react-router-dom";
import { ClinicTeamSettingsPage } from "./ClinicTeamSettingsPage";
import { ClinicSettingsPage } from "./ClinicSettingsPage";
import { ClinicPlansSettingsPage } from "./ClinicPlansSettingsPage";
import { ClinicAnamneseSettingsPage } from "./ClinicAnamneseSettingsPage";

export function SettingsRoutes() {
  return [
    <Route key="settings" path="/settings" element={<ClinicSettingsPage />} />,
    <Route
      key="settings-team"
      path="/settings/team"
      element={<ClinicTeamSettingsPage />}
    />,
    <Route
      key="settings-plan"
      path="/settings/plans"
      element={<ClinicPlansSettingsPage />}
    />,
    <Route
      key="settings-anamnese"
      path="/settings/anamnese"
      element={<ClinicAnamneseSettingsPage />}
    />,
  ];
}
