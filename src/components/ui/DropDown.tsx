type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
};

export default function Dropdown({
  value,
  onChange,
  options,
  className = "",
}: DropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-[Montserrat]
                  outline-none transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                  hover:border-[var(--primary)] appearance-none cursor-pointer
        ${className}
      `}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}