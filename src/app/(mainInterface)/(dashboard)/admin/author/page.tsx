import { FormHeader } from "../components/formHeader/formHeader";

export default async function Author() {
  return (
    <div className="flex flex-col gap-6">
      <FormHeader entityLabel="Author" />
    </div>
  );
}
