import { getAuthors } from "@/lib/modules/authors/authors";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { FormHeader } from "../components/formHeader/formHeader";
import { BookCreationForm } from "./components/bookCreation/bookCreationForm";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Books({ params }: Props) {
  const { locale } = await params;

  const genres = await getAllGenres();
  const authors = await getAuthors();

  const t = await getTranslations({
    locale,
    namespace: "Common",
  });

  const tEntity = await getTranslations({
    locale,
    namespace: "Entities",
  });

  if (!genres || !authors) return null;

  return (
    <div className="flex flex-col gap-6">
      <FormHeader locale={locale} entityLabel={tEntity("books.entry")} />

      <BookCreationForm
        acceptButton={t("add")}
        cancelButton={t("cancel")}
        genres={genres}
        authors={authors}
      />
    </div>
  );
}
