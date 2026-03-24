import { RefObject } from "react";

export type InfoColor = "primary" | "secondary";

export interface InformationProps<T> {
  content: string | number;
  color: InfoColor;
  className?: string;
  ref?: RefObject<T | null>;
}

export const colorVariants = {
  primary: "text-primary",
  secondary: "text-secondary",
};

export function Information<T extends HTMLElement>({
  content,
  color,
  ref,
  className = "",
}: InformationProps<T>) {
  return (
    <p
      className={`text-[clamp(12px,0.5rem+3cqw,20px)] ${colorVariants[color]} ${className}`}
      ref={ref as React.Ref<HTMLParagraphElement>}
    >
      {content}
    </p>
  );
}
