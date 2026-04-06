import Multiselect, { SelectItemType } from "@/src/components/client/multiselect/multiselect";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextError } from "../../../input/textError";

interface FormMultiselectProps<T extends FieldValues, Item extends SelectItemType> {
  name: Path<T>;
  control: Control<T>;
  items: Item[];
  label: string;
  placeholder?: string;
}

export function FormMultiselect<T extends FieldValues, Item extends SelectItemType>({
  name,
  control,
  items,
  label,
}: FormMultiselectProps<T, Item>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const safeValue = items.filter((item) => value.includes(item._id));

        return (
          <div className="w-full">
            <Multiselect
              label={label}
              name={name}
              items={items}
              value={safeValue}
              onChange={(selected) => {
                onChange(selected.map((item) => item._id));
              }}
            />
            <TextError errorMessage={error?.message} />
          </div>
        );
      }}
    />
  );
}
