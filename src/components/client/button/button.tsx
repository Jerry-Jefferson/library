"use client";

export type Padding = "small" | "medium" | "large";
export type ColorVariant = "primary" | "secondary";
export type ButtonType = "submit" | "button" | "reset";

export interface ButtonProps {
  children: React.ReactNode;
  padding: Padding;
  colorVariant?: ColorVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
}

const paddingVariants = {
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

const colorVariants = {
  primary: "bg-primary",
  secondary: "border border-secondary text-foreground hover:bg-secondary",
};

export function Button({
  children,
  padding,
  colorVariant = "primary",
  disabled,
  onClick,
  className = "",
  type = "submit",
}: ButtonProps) {
  return (
    <button
      className={`${colorVariants[colorVariant]} hover:bg-primary-hover rounded-md text-background text-[clamp(10px,0.5rem+1vw,16px)]
      ${paddingVariants[padding]} focus:border-foreground cursor-pointer w-full 
      disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary 
      ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
