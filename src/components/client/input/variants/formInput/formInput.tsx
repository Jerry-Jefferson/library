"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "../../unput";

export interface CommonProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  errorMessage?: string;
}

export type FormInputProps<T extends FieldValues> = CommonProps<T> &
  ({ password: true; type?: never } | { password?: false; type?: string });

export function FormInput<T extends FieldValues>({
  name,
  type,
  register,
  label,
  errorMessage,
  password = false,
}: FormInputProps<T>) {
  return (
    <Input name={name}>
      {password ? (
        <Input.PasswordField register={register} />
      ) : (
        <Input.Field type={type} register={register} />
      )}
      <Input.Label label={label} />
      <Input.TextError errorMessage={errorMessage} />
    </Input>
  );
}
