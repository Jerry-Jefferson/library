"use client";

import { Checkbox, Field, Label } from "@headlessui/react";
import { MdCheck } from "react-icons/md";

export type CheckboxVariant = "primary" | "secondary" | "custom";
export type Size = "standard" | "small" | "medium" | "large";

export interface CheckboxProps {
  variant: CheckboxVariant;
  size?: Size;
  label?: string;
  labelColor?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const checkboxVariants: Record<CheckboxVariant, string> = {
  custom: "",
  primary:
    "bg-card-back text-background border border-secondary data-checked:bg-primary data-focus:outline-secondary data-disabled:bg-gray-500/20 data-disabled:border-gray-500/20",
  secondary:
    "bg-background border border-secondary text-foreground data-checked:bg-primary data-focus:outline-secondary data-disabled:bg-gray-500/20 data-disabled:border-gray-500/20",
};

const sizesVariants = {
  small: { box: "size-4", icon: "size-3", label: "text-[10px]" },
  standard: { box: "size-6", icon: "size-4", label: "text-[11px]" },
  medium: { box: "size-8", icon: "size-5", label: "text-xs" },
  large: { box: "size-10", icon: "size-7", label: "text-md" },
};

const baseStyle =
  "group shrink-0 flex items-center justify-center rounded-md border focus:not-data-focus:outline-none data-focus:outline data-focus:outline-offset-2";

export default function CheckboxLibrary({
  variant,
  size = "standard",
  label = "",
  labelColor = "text-secondary",
  disabled = false,
  checked,
  onChange,
  className = "",
  ...props
}: CheckboxProps) {
  const currentSize = sizesVariants[size];

  return (
    <Field
      disabled={disabled}
      className="cursor-pointer flex flex-col items-center gap-2 data-disabled:cursor-not-allowed"
    >
      <Label passive className={`${labelColor} ${currentSize.label}`}>
        {label}
      </Label>
      <Checkbox
        {...props}
        checked={Boolean(checked)}
        onChange={onChange}
        className={`${baseStyle} ${checkboxVariants[variant]} ${currentSize.box} ${className}`}
      >
        <MdCheck
          className={`hidden fill-black group-data-checked:block ${currentSize.icon} group-data-disabled:fill-gray-400 
  group-data-disabled:opacity-50`}
        />
      </Checkbox>
    </Field>
  );
}
