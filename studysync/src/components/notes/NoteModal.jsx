import {
  Dialog,
  DialogContent,
} from "../ui/dialog";

export default function NoteModal({
  isOpen,
  onClose,
  children,
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="bg-white max-w-md rounded-2xl">
        {children}
      </DialogContent>
    </Dialog>
  );
}