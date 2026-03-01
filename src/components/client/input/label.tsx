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
      {label}
    </label>
  );
}
