"use client";

import { useMemo, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOptions, Field } from "@headlessui/react";
import useDebounce from "@/src/shared/hooks/useDebounce";
import OptionItem from "./optionItem";
import { BaseProps, SelectItemType } from "./types";

export type SingleSelectProps<T extends SelectItemType> = BaseProps<T> & {
  value: T | null;
  onChange: (value: T | null) => void;
};

export default function SingleSelect<T extends SelectItemType>({
  items,
  label,
  isDisabled = false,
  name,
  value,
  onChange,
  placeholder = "",
}: SingleSelectProps<T>) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 800);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return items;

    const q = debouncedQuery.toLowerCase();

    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, debouncedQuery]);

  const showPlaceholder = !isFocused && !value && !query;

  return (
    <Field disabled={isDisabled} className="relative w-full">
      <Combobox value={value} onChange={onChange} by="_id" name={name} immediate>
        <div className="relative group rounded-md">
          {label && (
            <label
              className={`absolute left-4 top-2 text-xs tracking-wider z-20 transition-colors duration-50 pointer-events-none
              ${isFocused ? "text-primary" : "text-secondary"}`}
            >
              {label}
            </label>
          )}

          <div
            className={`flex items-center w-full rounded-md border transition-all duration-100
              px-4 pt-6 pb-2 min-h-14.5 bg-background
              ${isFocused ? "border-primary ring-2 ring-primary/30 outline-none" : "border-secondary"}`}
          >
            <ComboboxInput
              displayValue={(item: T) => item?.title ?? ""}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder={showPlaceholder ? placeholder : ""}
            />
          </div>
        </div>

        <ComboboxOptions className="absolute left-0 top-full w-full mt-1 rounded-lg border border-primary bg-background shadow-xl z-50 max-h-60 overflow-auto focus:outline-none">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-sm text-secondary italic text-center">Nothing found</div>
          ) : (
            filteredItems.map((item) => (
              <OptionItem key={item._id} item={item} isSelected={value?._id === item._id} />
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
