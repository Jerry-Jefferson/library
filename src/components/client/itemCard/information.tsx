export type InfoColor = "primary" | "secondary";

export interface InformationProps {
  content: string | number;
  color: InfoColor;
  className?: string;
}

export const colorVariants = {
  primary: "text-primary",
  secondary: "text-secondary",
};

export function Information({ content, color, className }: InformationProps) {
  return (
    <p className={`text-[clamp(12px,0.5rem+3cqw,20px)] ${colorVariants[color]} ${className || ""}`}>
      {content}
    </p>
  );
}
