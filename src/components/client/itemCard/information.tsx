export type InfoColor = "primary" | "secondary";

export interface InformationProps {
  content: string;
  color: InfoColor;
}

const colorVariants = {
  primary: "text-primary",
  secondary: "text-secondary",
};

export function Information({ content, color }: InformationProps) {
  return (
    <p className={`text-[clamp(14px,6cqw,24px)] ${colorVariants[color]} truncate`}>{content}</p>
  );
}
