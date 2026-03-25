export interface TitleProps {
  content: string;
  className?: string;
}

export function Title({ content, className }: TitleProps) {
  return <p className={`text-[clamp(14px,0.5rem+4cqw,50px)] ${className || ""}`}>{content}</p>;
}
