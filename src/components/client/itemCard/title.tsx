export interface TitleProps {
  content: string;
  className?: string;
}

export function Title({ content, className }: TitleProps) {
  return <p className={`text-[clamp(14px,7cqw,50px)] ${className || ""}`}>{content}</p>;
}
