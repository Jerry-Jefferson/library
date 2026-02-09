export interface RadioButtonOption {
  name: string;
  value: string;
}

export interface RadioButtonProps {
  legend: string;
  options: RadioButtonOption[];
}

export function RadioButton({ legend, options }: RadioButtonProps) {
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
                name={option.name}
                className="accent-primary"
              />
              <span>{option.value}</span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
