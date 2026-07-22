type AlertProps = {
  type?: "success" | "error" | "warning" | "info";
  message: string;
};

export default function Alert({ type = "info", message }: AlertProps) {
  const base =
    "p-4 rounded-lg text-sm font-medium border font-[Montserrat] transition text-center"; // ajout text-center

  const styles = {
    success:
      "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)] dark:bg-[var(--success)]/10",
    error:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)] dark:bg-[var(--danger)]/10",
    warning:
      "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)] dark:bg-[var(--warning)]/10",
    info:
      "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)] dark:bg-[var(--primary)]/10",
  };

  return <div className={`${base} ${styles[type]}`}>{message}</div>;
}
