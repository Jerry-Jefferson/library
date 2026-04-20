"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useInput } from "./useInput";

export interface FieldProps<T extends FieldValues> {
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
}

export function Field<T extends FieldValues>({ type, disabled = false, register }: FieldProps<T>) {
  const { name } = useInput();
  return (
    <input
      id={name}
      placeholder=" "
      disabled={disabled}
      className="
      peer w-full border border-secondary rounded-md
      px-4 pt-6 pb-2
      focus:border-primary focus:outline-none
      focus:ring-2 focus:ring-primary/30
      disabled:cursor-not-allowed disabled:bg-gray-500/20 disabled:border-gray-500/20
    "
      type={type}
      {...register(name as Path<T>)}
    />
  );
}
