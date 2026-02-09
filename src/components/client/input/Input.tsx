export interface InputProps {
  name: string;
  type: string;
}

export function Input({ name, type }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        id={name}
        placeholder=" "
        className="
      peer w-full border border-secondary rounded-md
      px-4 pt-6 pb-2
      focus:border-primary focus:outline-none
      focus:ring-2 focus:ring-primary/30
    "
        type={type}
      />

      <label
        htmlFor={name}
        className="
      pointer-events-none
      absolute left-4 top-1/2 -translate-y-1/2
      text-secondary
      transition-all duration-200

      peer-focus:top-2
      peer-focus:text-xs
      peer-focus:text-primary
      peer-focus:translate-y-0

      peer-not-placeholder-shown:top-2
      peer-not-placeholder-shown:text-xs
      peer-not-placeholder-shown:translate-y-0
    "
      >
        {name}
      </label>
    </div>
  );
}
