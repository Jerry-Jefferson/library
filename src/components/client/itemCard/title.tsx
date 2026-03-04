export interface TitleProps {
  content: string;
}

export function Title({ content }: TitleProps) {
  return <p className="text-[clamp(16px,7cqw,32px)] truncate">{content}</p>;
}
