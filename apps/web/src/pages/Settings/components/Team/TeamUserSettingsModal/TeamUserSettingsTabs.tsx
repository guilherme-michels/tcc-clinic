import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";
import { Comission } from "../Comission/Comission";
import { OpeningHours } from "../OpeningHours/OpeningHours";
import { PermissionList } from "../Permissions/PermissionsList";

export function TeamUserSettingsTabs() {
  return (
    <Tabs defaultValue="permissions" className="col-span-4">
      <TabsList>
        <TabsTrigger value="permissions">Permissões</TabsTrigger>
        <TabsTrigger value="openingHours">Horários de atendimento</TabsTrigger>
        <TabsTrigger value="comission">Comissão</TabsTrigger>
      </TabsList>

      <TabsContent value="permissions">
        <PermissionList />
      </TabsContent>
      <TabsContent value="openingHours">
        <OpeningHours />
      </TabsContent>
      <TabsContent value="comission">
        <Comission />
      </TabsContent>
    </Tabs>
  );
}
