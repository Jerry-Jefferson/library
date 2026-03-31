import { CreationFormLayout } from "../components/creationFormLayout";

export default async function Books() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-5xl font-bold">
        <p>Add New</p>
        <p className="text-primary">Book Entry</p>
      </div>
      <form>
        <CreationFormLayout imageLoader={<div></div>}>
          <p>Hello</p>
        </CreationFormLayout>
      </form>
    </div>
  );
}
