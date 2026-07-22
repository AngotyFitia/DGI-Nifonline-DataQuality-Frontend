type ModalAlign = "left" | "center";
type ModalSize = "sm" | "md" | "lg";
import { X } from "lucide-react";


export default function Modal({ open, onClose, children, size = "md", align = "left" }: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  align?: ModalAlign;
}) {
  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-6xl",
  };

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto mx-auto`}>
        <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl shadow-xl border border-[var(--border)] font-[Montserrat]">
          <div className="flex justify-end p-4 pb-0">
            <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--danger)]">
              <X size={20} />
            </button>
          </div>
          <div className={`p-6 ${alignClass}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
