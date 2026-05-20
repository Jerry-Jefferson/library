"use client";

import { useTranslations } from "next-intl";

export interface TextErrorProps {
  errorMessage?: string;
}

export function TextError({ errorMessage }: TextErrorProps) {
  const t = useTranslations();
  if (!errorMessage) return null;
  return <p className="text-red-500 text-sm pt-2">{t(errorMessage)}</p>;
}
