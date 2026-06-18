type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "alert";
    onClick?: () => void;
    className?: string;
  };
  
  export default function Button({
    children,
    variant = "primary",
    onClick,
    className = "",
  }: ButtonProps) {
    const base = "px-4 py-2 rounded-md text-sm font-medium transition";
  
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-white/10 text-white hover:bg-white/20",
      alert: "bg-yellow-600 text-white hover:bg-yellow-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };
  
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  }