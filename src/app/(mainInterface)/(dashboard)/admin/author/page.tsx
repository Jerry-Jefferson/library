import { Button } from "@/src/components/client/button/button";
import { CreationFormLayout } from "../components/creationFormLayout/creationFormLayout";
import { FormHeader } from "../components/formHeader/formHeader";

export default async function Author() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Author" />
      <CreationFormLayout
        imageLoader={
          <div className="border border-secondary border-dashed rounded-md w-full h-full flex flex-col justify-center items-center">
            <input type="file" />
            <p>PNG or JPG, max 10MB</p>
          </div>
        }
      >
        <div className="flex justify-between gap-6">
          <input placeholder="Enter the title" />
        </div>
        <div className="flex justify-between gap-6">
          <input placeholder="Enter the birth date" />
          <input placeholder="Enter the death date" />
        </div>
        <textarea className="w-full resize-none" placeholder="Enter synopsis" rows={10}></textarea>
        <div className="flex justify-between gap-6">
          <Button padding="medium">Save</Button>
          <Button padding="medium" colorVariant="secondary">
            Cancel
          </Button>
        </div>
      </CreationFormLayout>
    </div>
  );
}
