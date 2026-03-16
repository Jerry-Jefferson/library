export type InfoColor = "primary" | "secondary";

export interface InformationProps {
  content: string | number;
  color: InfoColor;
  className?: string;
}

const colorVariants = {
  primary: "text-primary",
  secondary: "text-secondary",
};

export function Information({ content, color, className }: InformationProps) {
  return (
    <p
      className={`text-[clamp(14px,6cqw,24px)] ${colorVariants[color]} truncate ${className || ""}`}
    >
      {content}
    </p>
  );
}
