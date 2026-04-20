import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextError } from "../../../input/textError";
import CheckboxLibrary, { CheckboxVariant, Size } from "../../checkbox";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  variant: CheckboxVariant;
  size?: Size;
  label?: string;
  labelColor?: string;
  disabled?: boolean;
  className?: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  variant,
  size,
  labelColor,
  disabled,
  className,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <>
            <CheckboxLibrary
              label={label}
              checked={value}
              onChange={onChange}
              variant={variant}
              size={size}
              labelColor={labelColor}
              disabled={disabled}
              className={className}
            />
            <TextError errorMessage={error?.message} />
          </>
        );
      }}
    />
  );
}
