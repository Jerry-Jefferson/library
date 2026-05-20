import { getTranslations } from "next-intl/server";

type Props = {
  entityLabel: string;
  locale: string;
};

export async function FormHeader({ entityLabel, locale }: Props) {
  const t = await getTranslations({
    locale,
    namespace: "Common",
  });

  return (
    <div className="text-5xl font-bold">
      <p className="text-[clamp(14px,0.5rem+4vw,50px)]">{t("newEntry")}</p>

      <p className="text-primary text-[clamp(14px,0.5rem+4vw,50px)]">
        {t("entry", { entity: entityLabel })}
      </p>
    </div>
  );
}
