"use client";

import { ComboboxOption } from "@headlessui/react";

export default function OptionItem<T extends { _id: string; title: string }>({
  item,
  isSelected,
}: {
  item: T;
  isSelected: boolean;
}) {
  return (
    <ComboboxOption
      value={item}
      className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm
      data-focus:bg-primary/10
      data-selected:bg-primary data-selected:text-neutral-dark
      transition-colors"
    >
      <span>{item.title}</span>
      {isSelected && <span className="text-[10px]">✓</span>}
    </ComboboxOption>
  );
}
