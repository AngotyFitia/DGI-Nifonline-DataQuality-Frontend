import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-blue-500",
        className
      )}
    />
  );
}