import { X } from "lucide-react";

export default function TaskModal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}