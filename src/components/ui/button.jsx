export function Button({ children, className = "", variant, ...props }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2";

  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={`${base} ${styles[variant || "default"]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
