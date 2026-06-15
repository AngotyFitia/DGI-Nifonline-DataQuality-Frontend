type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input {...props} className="  w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)] text-[var(--text-primary)] outline-none focus:border-blue-500"/>
  );
}