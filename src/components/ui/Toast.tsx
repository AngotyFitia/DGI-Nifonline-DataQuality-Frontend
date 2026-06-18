import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

export default function Toast({
  message,
  type = "info",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-orange-500",
    info: "bg-blue-600",
  };

  return (
    <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg ${styles[type]}`}>
      {message}
    </div>
  );
}