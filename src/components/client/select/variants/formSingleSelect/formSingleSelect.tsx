"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextError } from "../../../input/textError";
import SingleSelect from "../../singleSelect";
import { SelectItemType, VariantType } from "../../types";
import { useTranslations } from "next-intl";
import { userMessages } from "@/src/shared/constants/userMessages";

interface FormSingleSelectProps<T extends FieldValues, Item extends SelectItemType> {
  name: Path<T>;
  control: Control<T>;
  items: Item[];
  label: string;
  placeholder?: string;
  variant: VariantType;
}

export function FormSingleSelect<T extends FieldValues, Item extends SelectItemType>({
  name,
  control,
  items,
  label,
  variant = "primary",
}: FormSingleSelectProps<T, Item>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const safeValue = items.find((item) => item._id === value) ?? null;

        return (
          <div className="w-full">
            <SingleSelect
              label={label}
              name={name}
              items={items}
              value={safeValue}
              onChange={(selected) => {
                onChange(selected?._id ?? null);
              }}
              variant={variant}
            />
            <TextError errorMessage={error ? userMessages.common.requiredField : ""} />
          </div>
        );
      }}
    />
  );
}
