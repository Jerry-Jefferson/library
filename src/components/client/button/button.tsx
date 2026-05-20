"use client";

import { ButtonHTMLAttributes } from "react";
import { Spinner } from "../spinner/spinner";

export type Size = "standard" | "small" | "medium" | "large";
export type ButtonVariant = "custom" | "primary" | "secondary" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: Size;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

const sizesVariants = {
  standard: "",
  small: "p-1.5 sm:p-2",
  medium: "p-3 sm:p-4",
  large: "p-4 sm:p-6",
};

const buttonVariants: Record<ButtonVariant, string> = {
  custom: "",
  primary: "bg-primary enabled:hover:bg-primary-hover text-background focus:border-foreground",
  secondary: "border border-secondary text-foreground enabled:hover:bg-secondary",
  icon: "p-0 h-fit w-fit",
};

const baseStyle =
  "inline-flex items-center justify-center rounded-md transition-colors text-[clamp(10px,0.5rem+1vw,16px)] cursor-pointer focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  children,
  type,
  size = "standard",
  variant = "custom",
  fullWidth,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseStyle} ${buttonVariants[variant]} ${sizesVariants[size]} ${fullWidth ? "w-full" : "w-fit"} ${className}`}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner width="30px" color="grey" /> : children}
    </button>
  );
}
