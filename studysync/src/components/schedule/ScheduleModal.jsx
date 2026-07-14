import {
  Dialog,
  DialogContent,
} from "../ui/dialog";


export default function ScheduleModal({
  isOpen,
  onClose,
  children,
}) {

  return (

    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >

      <DialogContent
        className="
        max-w-xl
        bg-white
        rounded-3xl
        p-8
        shadow-xl
        "
      >

        {children}

      </DialogContent>


    </Dialog>

  );

}   