import { getTranslations } from "next-intl/server";
import { FormHeader } from "../components/formHeader/formHeader";
import { AuthorCreationForm } from "./components/authorCreationForm/authorCreationForm";

export default async function Author() {
  const t = await getTranslations("Common");
  const tEntity = await getTranslations("Entities");
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel={tEntity("authors.entry")} />
      <AuthorCreationForm acceptButton={t("add")} cancelButton={t("cancel")} />
    </div>
  );
}
