import { getTranslations } from "next-intl/server";
import { FormHeader } from "../components/formHeader/formHeader";
import { AuthorCreationForm } from "./components/authorCreationForm/authorCreationForm";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Common",
  });

  const tEntity = await getTranslations({
    locale,
    namespace: "Entities",
  });

  return {
    title: `${t("add")} ${tEntity("authorLabel")}`,
    description: t("add"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Author({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Common",
  });

  const tEntity = await getTranslations({
    locale,
    namespace: "Entities",
  });

  return (
    <div className="flex flex-col gap-6">
      <FormHeader locale={locale} entityLabel={tEntity("authors.entry")} />
      <AuthorCreationForm acceptButton={t("add")} cancelButton={t("cancel")} />
    </div>
  );
}
