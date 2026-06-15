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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[var(--bg-secondary)] p-6 rounded-lg w-[400px]">
          <button onClick={onClose} className="float-right text-white">
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  }