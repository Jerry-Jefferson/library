export interface ButtonProps {
  content: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ content, disabled, onClick }: ButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primary-hover rounded-md p-4 text-background focus:border-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
