"use client";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  onClick?: () => void;
  variant: "success" | "error" | "primary" | "secondary";
}

const Button = ({ children, onClick, variant }: ButtonInterface) => {
  let styles = ["px-4", "py-5", "text-base", "rounded-md"];

  if (variant === "success")
    styles.push("bg-green-500 focus:bg-green-600 hover:bg-green-600");

  if (variant === "error")
    styles.push("bg-red-500 hover:bg-red-600 focus:bg-red-600");

  if (variant === "primary")
    styles.push("bg-blue-500 hover:bg-blue-600 focus:bg-blue-600");
  if (variant === "secondary")
    styles.push("bg-slate-400 hover:bg-slate-600 focus:bg-slate-600");

  return (
    <button className={styles.join(" ")} onClick={() => onClick?.()}>
      {children}
    </button>
  );
};

export default Button;
