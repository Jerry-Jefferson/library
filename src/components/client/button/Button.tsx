export interface ButtonProps {
  content: string;
}

export function Button({ content }: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primary-hover rounded-md p-4 text-background focus:border-foreground cursor-pointer"
      type="submit"
    >
      {content}
    </button>
  );
}
