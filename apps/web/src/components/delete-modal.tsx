import { XCircle } from "lucide-react";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";

interface DeleteModalProps {
  isOpened: boolean;
  onClose: () => void;
  confirmDelete: () => void;
  name?: string;
}

export function DeleteModal({
  isOpened,
  onClose,
  name,
  confirmDelete,
}: DeleteModalProps) {
  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogContent className="flex flex-col items-center justify-center max-w-2xl">
        <XCircle size={120} className="text-red-600" />
        <strong className="text-xl">Deseja excluir {name}?</strong>

        <span className="text-center text-sm">
          Tem certeza que deseja excluir {name}? essa ação não poderá ser
          desfeita.
        </span>

        <div className="flex gap-4">
          <Button
            onClick={onClose}
            className="border-[1px] border-darkerBlue !bg-zinc-50 text-darkerBlue transition-all hover:!bg-zinc-200"
            type="button"
          >
            Cancelar
          </Button>
          <Button onClick={confirmDelete}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
