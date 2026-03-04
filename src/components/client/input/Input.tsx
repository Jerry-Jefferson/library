"use client";

import { ReactNode } from "react";
import { FieldValues, Path } from "react-hook-form";
import { Field } from "./field";
import { InputContext } from "./inputContext";
import { Label } from "./label";
import { TextError } from "./textError";

export interface InputProps<T extends FieldValues> {
  children: ReactNode;
  name: Path<T>;
}

export function Input<T extends FieldValues>({ children, name }: InputProps<T>) {
  return (
    <InputContext value={{ name }}>
      <div className="relative w-full">{children}</div>
    </InputContext>
  );
}

Input.Label = Label;
Input.Field = Field;
Input.TextError = TextError;
