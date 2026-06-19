type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "alert" | "success";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
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
      secondary: "bg-gray-600 text-white hover:bg-gray-600",
      alert: "bg-yellow-600 text-white hover:bg-yellow-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
      success: "bg-green-600 text-white hover:bg-green-700",
    };
  
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  }