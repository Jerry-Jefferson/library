import { getTranslations } from "next-intl/server";
import { FormHeader } from "../components/formHeader/formHeader";
import { GenreCreationForm } from "./components/genreCreation/genreCreationForm";

export default async function Genre() {
  const t = await getTranslations("Common");
  const tEntity = await getTranslations("Entities");
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel={tEntity("genres.entry")} />
      <GenreCreationForm border acceptButton={t("add")} cancelButton={t("cancel")} />
    </div>
  );
}
