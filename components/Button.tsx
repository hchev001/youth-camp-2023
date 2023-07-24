"use client";

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  onClick?: () => void;
  variant: "success" | "error" | "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const Button = ({
  children,
  onClick,
  variant,
  size = "medium",
}: ButtonInterface) => {
  let styles = ["text-base", "rounded-md"];
  let size_styles = [];

  if (size === "medium") {
    size_styles.push("px-4 py-5");
  } else if (size === "small") {
    size_styles.push("px-2 py-3");
  } else if (size === "large") {
    size_styles.push("px-5 py-6");
  }

  styles = [...size_styles, ...styles];

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
