import { CreationFormLayout } from "../components/creationFormLayout/creationFormLayout";
import { FormHeader } from "../components/formHeader/formHeader";
import { BookCreationForm } from "./components/bookCreation/bookCreationForm";

export default async function Books() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Book" />
      <CreationFormLayout
        imageLoader={
          <div className="border border-secondary border-dashed rounded-md w-full h-full flex flex-col justify-center items-center">
            <input type="file" />
            <p>PNG or JPG, max 10MB</p>
          </div>
        }
      >
        <BookCreationForm acceptButton="Add" cancelButton="Cancel" />
      </CreationFormLayout>
    </div>
  );
}
