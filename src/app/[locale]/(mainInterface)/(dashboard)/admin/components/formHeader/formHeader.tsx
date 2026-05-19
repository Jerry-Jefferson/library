import { getTranslations } from "next-intl/server";

export async function FormHeader({ entityLabel }: { entityLabel: string }) {
  const t = await getTranslations("Common");
  return (
    <div className="text-5xl font-bold">
      <p className="text-[clamp(14px,0.5rem+4vw,50px)]">{t("newEntry")}</p>
      <p className="text-primary text-[clamp(14px,0.5rem+4vw,50px)]">
        {t("entry", {
          entity: entityLabel,
        })}
      </p>
    </div>
  );
}
