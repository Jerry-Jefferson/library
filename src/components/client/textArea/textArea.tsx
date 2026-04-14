import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { TextError } from "../input/textError";

export interface TextAreaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errorMessage?: string;
}

export function TextArea<T extends FieldValues>({
  label,
  name,
  register,
  errorMessage,
}: TextAreaProps<T>) {
  return (
    <div className="group/field relative w-full flex flex-col">
      <div
        className="
          pointer-events-none absolute top-[1px] left-[1px] right-4 h-7 
          bg-card-back z-10 rounded-tl-md
        "
        aria-hidden="true"
      />
      <textarea
        id={name}
        className="
          peer w-full resize-none border border-secondary rounded-md
          px-4 pt-7 pb-2
          placeholder-transparent
          focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30
          bg-transparent relative z-0
          text-base
        "
        rows={8}
        placeholder=" "
        spellCheck="true"
        {...register(name)}
      ></textarea>

      <label
        htmlFor={name}
        className="
          pointer-events-none absolute left-4 top-2
          text-xs text-secondary z-20

          peer-focus:text-primary
        "
      >
        {label}
      </label>
      <TextError errorMessage={errorMessage} />
    </div>
  );
}
