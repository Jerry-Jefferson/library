"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button/button";
import { useTranslations } from "next-intl";

type EmptyStateProps = {
  title?: string;
  description?: string;
  backLabel?: string;
};

export default function EmptyState({
  title = "Ничего не найдено",
  description = "Попробуйте изменить параметры поиска или вернитесь назад.",
}: EmptyStateProps) {
  const router = useRouter();
  const t = useTranslations("Common");
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 mb-6">{description}</p>

      <Button onClick={() => router.back()} variant="primary">
        {t("goBack")}
      </Button>
    </div>
  );
}
