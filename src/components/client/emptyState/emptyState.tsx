import LinkButton from "../../server/linkButton/linkButton";
import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  path?: string;
  buttonLabel?: string;
  children?: ReactNode;
};

export default function EmptyState({ title, description, path, buttonLabel, children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 text-center p-6 gap-4">
      <h2 className="text-4xl font-semibold">{title}</h2>

      {description && <p className="text-secondary">{description}</p>}

      {path && <LinkButton href={path}>{buttonLabel ?? "goBack"}</LinkButton>}

      {children}
    </div>
  );
}
