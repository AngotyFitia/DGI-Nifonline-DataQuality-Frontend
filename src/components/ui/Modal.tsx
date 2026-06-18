import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">      
      <div  className=" w-full max-w-6xl max-h-[90vh] overflow-y-auto ">
        <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl shadow-xl border border-[var(--border)]">
          <div className="flex justify-end p-4 pb-0">
            <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-red-500 text-lg">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}