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
    <div className="group/field relative w-full">
      <textarea
        className="
          peer w-full resize-none border border-secondary rounded-md
          px-4 pt-6 pb-2 
          placeholder-transparent
          focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30
        "
        rows={8}
        placeholder=" "
        spellCheck="true"
        {...register(name as Path<T>)}
      ></textarea>
      <label
        htmlFor={name}
        className="
          pointer-events-none absolute left-4 top-1/2 -translate-y-1/2
          text-secondary transition-all duration-200 origin-left

          group-has-[:focus]/field:top-2
          group-has-[:focus]/field:translate-y-0
          group-has-[:focus]/field:text-xs
          group-has-[:focus]/field:text-primary

          group-has-[:not(:placeholder-shown)]/field:top-2
          group-has-[:not(:placeholder-shown)]/field:translate-y-0
          group-has-[:not(:placeholder-shown)]/field:text-xs
        "
      >
        {label}
      </label>
      <TextError errorMessage={errorMessage} />
    </div>
  );
}
