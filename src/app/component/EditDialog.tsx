import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IncomeType } from "@/lib/type";

import { InputForm } from "@/app/component/InputForm";

export function EditDialog({
  open,
  setOpen,
  editData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: IncomeType;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
          </DialogHeader>
          <InputForm editData={editData} onOpenChange={setOpen} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
