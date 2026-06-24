import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export default function Input({
  className,
  label,
  hint,
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        {...props}
        className={clsx(
          `w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] font-[Montserrat] outline-none transition-all duration-200
          focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 hover:border-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed`,
          className
        )}
      />

      {hint && (
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          {hint}
        </p>
      )}
    </div>
  );
}