import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        `w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]font-[Montserrat] outline-none transition-all duration-200
        focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 hover:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed
        `,
        className
      )}
    />
  );
}