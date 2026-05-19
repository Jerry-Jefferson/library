"use client";

import { Input } from "@/src/components/client/input/input";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface CommonProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  disabled?: boolean;
  errorMessage?: string;
  className?: string;
}

export type FormInputProps<T extends FieldValues> = CommonProps<T> &
  ({ password: true; type?: never } | { password?: false; type?: string });

export function FormInput<T extends FieldValues>({
  name,
  type,
  register,
  label,
  disabled = false,
  errorMessage,
  password = false,
  className = "",
}: FormInputProps<T>) {
  return (
    <Input name={name}>
      {password ? (
        <Input.PasswordField register={register} />
      ) : (
        <Input.Field disabled={disabled} type={type} register={register} className={className} />
      )}
      <Input.Label label={label} />
      <Input.TextError errorMessage={errorMessage} />
    </Input>
  );
}
