"use client";

import { ButtonHTMLAttributes } from "react";

export type Size = "small" | "medium" | "large";
export type ButtonVariant = "plain" | "primary" | "secondary" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: Size;
  variant?: ButtonVariant;
  className?: string;
}

const sizesVariants = {
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

const buttonVariants: Record<ButtonVariant, string> = {
  plain: "bg-neutral-dark",
  primary: "bg-primary enabled:hover:bg-primary-hover text-background focus:border-foreground",
  secondary: "border border-secondary text-foreground hover:bg-secondary",
  icon: "relative p-0 h-fit w-fit flex-shrink-0",
};

const baseStyle =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors text-[clamp(10px,0.5rem+1vw,16px)] cursor-pointer w-full focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  children,
  type,
  size,
  variant = "plain",
  disabled,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${baseStyle} ${buttonVariants[variant]} ${sizesVariants[size]} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
