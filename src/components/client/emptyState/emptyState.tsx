"use client";

import { useTranslations } from "next-intl";
import LinkButton from "../../server/linkButton/linkButton";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type EmptyStateProps = {
  title: string;
  description?: string;
  path?: string;
  buttonLabel?: string;
  children?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  path,
  buttonLabel,
  children,
}: EmptyStateProps) {
  const t = useTranslations("Common");
  return (
    <div className="flex flex-col items-center justify-center min-h-100 text-center p-6 gap-4">
      <h2 className="text-4xl font-semibold">{title}</h2>
      {description ? <p className="text-secondary">{description}</p> : null}

      {path && <LinkButton href={path}>{buttonLabel ? buttonLabel : t("goBack")}</LinkButton>}
      {children}
    </div>
  );
}
