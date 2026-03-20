"use client";

export type Padding = "small" | "medium" | "large";

export interface ButtonProps {
  content: string;
  padding: Padding;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const paddingVariants = {
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

export function Button({ content, padding, disabled, onClick, className }: ButtonProps) {
  return (
    <button
      className={`bg-primary hover:bg-primary-hover rounded-md text-background text-[clamp(10px,0.5rem+1vw,16px)]
      ${paddingVariants[padding]} focus:border-foreground cursor-pointer w-full 
      disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary 
      ${className || ""}`}
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
