type AlertProps = {
    type?: "success" | "error" | "warning" | "info";
    message: string;
  };
  
  export default function Alert({ type = "info", message }: AlertProps) {
    const base ="p-4 rounded-lg text-sm font-medium border border-[var(--border)] font-[Montserrat] transition";  
    const styles = {
      success:"bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/30 dark:bg-[var(--success)]/10 dark:border-[var(--border)]",
      error:"bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/30 dark:bg-[var(--danger)]/10 dark:border-[var(--border)]",
      warning:"bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/30 dark:bg-[var(--warning)]/10 dark:border-[var(--border)]",
      info:"bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30 dark:bg-[var(--primary)]/10 dark:border-[var(--border)]",
    };
  
    return <div className={`${base} ${styles[type]}`}>{message}</div>;
  }