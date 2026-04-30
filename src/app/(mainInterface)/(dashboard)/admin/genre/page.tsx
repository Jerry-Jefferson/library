import { FormHeader } from "../components/formHeader/formHeader";
import { GenreCreationForm } from "./components/genreCreation/genreCreationForm";

export default async function Genre() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Genre" />
      <GenreCreationForm border acceptButton="Add" cancelButton="Cancel" />
    </div>
  );
}
