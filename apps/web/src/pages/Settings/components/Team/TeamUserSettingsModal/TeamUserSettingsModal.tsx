import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { TeamUserSettingsTabs } from "./TeamUserSettingsTabs";

interface TeamUserSettingsModal {
  isOpened: boolean;
  onClose: () => void;
}

export function TeamUserSettingsModal({
  isOpened,
  onClose,
}: TeamUserSettingsModal) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="flex flex-col max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex flex-col text-xl p-2 rounded">
            Guilherme Michels
          </DialogTitle>
        </DialogHeader>
        <div className="border-[1px] rounded border-zinc-300 p-4">
          <TeamUserSettingsTabs />
        </div>

        <DialogFooter className="!flex !w-full !justify-between items-center">
          <div />
          <div className="flex gap-2">
            <Button
              className="bg-opacity-0 text-black border-[1px] border-black hover:bg-zinc-200 transition-all"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
