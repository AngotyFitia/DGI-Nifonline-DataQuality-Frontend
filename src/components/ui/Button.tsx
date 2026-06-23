type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "alert" | "success" | "analysis" | "archive" | "cancel";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {

  const base ="px-4 py-2 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50";
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-90",
    secondary: "bg-[var(--primary-light)] text-[var(--text-primary)] hover:opacity-90",
    alert: "bg-[var(--warning)] text-white hover:opacity-90",
    danger: "bg-[var(--danger)] text-white hover:opacity-90",
    success: "bg-[var(--success)] text-white hover:opacity-90",
    analysis: "bg-[var(--primary-soft)] text-white hover:opacity-90",
    archive: "bg-[var(--text-secondary)] text-white hover:opacity-90",
    cancel: "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>{children}</button>
  );
}