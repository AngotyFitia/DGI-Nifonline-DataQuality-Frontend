type BadgeProps = {
    label: string;
    color?: "blue" | "green" | "red" | "yellow";
  };
  
  export default function Badge({ label, color = "blue" }: BadgeProps) {
    const colors = {
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
      red: "bg-red-500/20 text-red-400",
      yellow: "bg-yellow-500/20 text-yellow-400",
    };
  
    return (
      <span className={`px-2 py-1 text-xs rounded ${colors[color]}`}>
        {label}
      </span>
    );
  }