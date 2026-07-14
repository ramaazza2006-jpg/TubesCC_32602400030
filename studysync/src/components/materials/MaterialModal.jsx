import {
  Dialog,
  DialogContent,
} from "../ui/dialog";

export default function MaterialModal({
  isOpen,
  onClose,
  children,
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-xl bg-white rounded-2xl">
        {children}
      </DialogContent>
    </Dialog>
  );
}