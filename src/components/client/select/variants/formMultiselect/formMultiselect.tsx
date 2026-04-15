import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextError } from "../../../input/textError";
import MultiSelect from "../../multiSelect";
import { SelectItemType, VariantType } from "../../types";

interface FormMultiselectProps<T extends FieldValues, Item extends SelectItemType> {
  name: Path<T>;
  control: Control<T>;
  items: Item[];
  label: string;
  placeholder?: string;
  variant: VariantType;
}

export function FormMultiselect<T extends FieldValues, Item extends SelectItemType>({
  name,
  control,
  items,
  label,
  variant,
}: FormMultiselectProps<T, Item>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const safeValue = items.filter((item) => value.includes(item._id));

        return (
          <div className="w-full">
            <MultiSelect
              label={label}
              name={name}
              items={items}
              value={safeValue}
              onChange={(selected) => {
                onChange(selected.map((item) => item._id));
              }}
              variant={variant}
            />
            <TextError errorMessage={error?.message} />
          </div>
        );
      }}
    />
  );
}
