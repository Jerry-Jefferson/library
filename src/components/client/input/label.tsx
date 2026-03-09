"use client";

import { useInput } from "./useInput";

export interface LabelProps {
  label: string;
}

export function Label({ label }: LabelProps) {
  const { name } = useInput();
  return (
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
  );
}
