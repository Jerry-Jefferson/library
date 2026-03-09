"use client";

import HidddenPassword from "@/public/hidden.png";
import OpenPassword from "@/public/visible.png";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useInput } from "./useInput";
import { VisibilityImage } from "./visibilityImage";

export interface FieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}

export function PasswordField<T extends FieldValues>({ register }: FieldProps<T>) {
  const [show, setShow] = useState(false);
  const { name } = useInput();
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
          pr-12 
          transition-all
    "
        type={show ? "text" : "password"}
        {...register(name as Path<T>)}
      />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        onClick={() => setShow((prev) => !prev)}
        type="button"
      >
        {show ? (
          <VisibilityImage alt="hide" src={OpenPassword} />
        ) : (
          <VisibilityImage alt="show" src={HidddenPassword} />
        )}
      </button>
    </div>
  );
}
