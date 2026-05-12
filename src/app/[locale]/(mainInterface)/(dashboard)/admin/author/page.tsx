import { FormHeader } from "../components/formHeader/formHeader";
import { AuthorCreationForm } from "./components/authorCreationForm/authorCreationForm";

export default async function Author() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Author" />
      <AuthorCreationForm acceptButton="Add" cancelButton="Cancel" />
    </div>
  );
}
