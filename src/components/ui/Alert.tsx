type AlertProps = {
    type?: "success" | "error" | "warning" | "info";
    message: string;
};
  
export default function Alert({ type = "info", message }: AlertProps) {
    const base = "p-4 rounded-lg text-sm font-medium border";

    const styles = {    success: "bg-green-500/10 text-green-500 border-green-500/30",
                        error: "bg-red-500/10 text-red-500 border-red-500/30",
                        warning: "bg-orange-500/10 text-orange-500 border-orange-500/30",
                        info:"bg-blue-500/10 text-blue-500 border-blue-500/30",
    };
    return <div className={`${base} ${styles[type]}`}>{message}</div>;
}