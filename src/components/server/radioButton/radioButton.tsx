import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface RadioButtonOption {
  title: string;
  value: string;
}

export interface RadioButtonProps<T extends FieldValues> {
  name: Path<T>;
  legend: string;
  options: RadioButtonOption[];
  register: UseFormRegister<T>;
}

export function RadioButton<T extends FieldValues>({
  name,
  legend,
  options,
  register,
}: RadioButtonProps<T>) {
  return (
    <fieldset className="flex flex-col text-secondary border border-secondary rounded-md px-4 pt-2 pb-2">
      <legend className="sr-only">{legend}</legend>
      <p className="text-sm font-medium">{legend}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <div key={option.value}>
            <label htmlFor={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                id={option.value}
                value={option.value}
                {...register(name)}
                className="accent-primary"
              />
              <span>{option.title}</span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
