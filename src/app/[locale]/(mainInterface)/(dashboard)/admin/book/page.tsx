import { getAuthors } from "@/lib/modules/authors/authors";
import { getAllGenres } from "@/lib/modules/genres/genres";
import { FormHeader } from "../components/formHeader/formHeader";
import { BookCreationForm } from "./components/bookCreation/bookCreationForm";

export default async function Books() {
  const genres = await getAllGenres();
  const authors = await getAuthors();
  if (!genres || !authors) return null;
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Book" />
      <BookCreationForm
        acceptButton="Add"
        cancelButton="Cancel"
        genres={genres}
        authors={authors}
      />
    </div>
  );
}
