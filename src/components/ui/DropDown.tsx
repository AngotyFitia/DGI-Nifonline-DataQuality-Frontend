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
      className={`
        px-3 py-2 text-sm rounded-md
        border border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text-primary)]
        outline-none
        focus:border-blue-500
        transition
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