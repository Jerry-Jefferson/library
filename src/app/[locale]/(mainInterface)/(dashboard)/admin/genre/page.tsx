import { getTranslations } from "next-intl/server";
import { FormHeader } from "../components/formHeader/formHeader";
import { GenreCreationForm } from "./components/genreCreation/genreCreationForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Genre({ params }: Props) {
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
      <FormHeader locale={locale} entityLabel={tEntity("genres.entry")} />

      <GenreCreationForm border acceptButton={t("add")} cancelButton={t("cancel")} />
    </div>
  );
}
