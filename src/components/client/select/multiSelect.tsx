"use client";
import useDebounce from "@/src/shared/hooks/useDebounce";
import { Combobox, ComboboxInput, ComboboxOptions, Field } from "@headlessui/react";
import { useMemo, useState } from "react";
import OptionItem from "./optionItem";
import SelectedItem from "./selectedItem";
import { BaseProps, SelectItemType, VariantType } from "./types";
import { variantStyles } from "./variantStyles";

export const MAX_VISIBLE = 2;

export type MultiSelectProps<T extends SelectItemType> = BaseProps<T> & {
  value: T[];
  onChange: (value: T[]) => void;
};

export default function MultiSelect<T extends SelectItemType>({
  variant = "primary",
  items,
  label,
  isDisabled = false,
  name,
  value,
  onChange,
  placeholder = "",
}: MultiSelectProps<T> & { variant?: VariantType }) {
  const styles = variantStyles[variant];

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 800);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return items;

    const q = debouncedQuery.toLowerCase();

    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, debouncedQuery]);

  const showPlaceholder = !isFocused && value.length === 0 && !query;

  const visibleItems = value.slice(0, MAX_VISIBLE);
  const hiddenCount = value.length - visibleItems.length;

  return (
    <Field disabled={isDisabled} className="relative w-full">
      <Combobox as="div" multiple value={value} onChange={onChange} by="_id" name={name} immediate>
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
            className={`flex flex-wrap items-center gap-2 w-full rounded-md border transition-all duration-100
              px-4 pt-6 pb-2 min-h-14.5 ${styles.inputBg}
              ${isFocused ? styles.borderFocus : styles.border}`}
          >
            {visibleItems.map((item) => (
              <SelectedItem
                key={item._id}
                item={item}
                onRemove={(id) => onChange(value.filter((v) => v._id !== id))}
              />
            ))}

            {hiddenCount > 0 && <span className="text-xs text-foreground">+{hiddenCount}</span>}

            <ComboboxInput
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none min-w-20 text-sm"
              placeholder={showPlaceholder ? placeholder : ""}
            />
          </div>
        </div>

        <ComboboxOptions
          className={`absolute left-0 top-full w-full mt-1 rounded-lg border border-primary shadow-xl z-50 max-h-60 overflow-auto focus:outline-none ${styles.inputBg}`}
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-sm text-secondary italic text-center">Nothing found</div>
          ) : (
            filteredItems.map((item) => (
              <OptionItem
                key={item._id}
                item={item}
                isSelected={value.some((v) => v._id === item._id)}
                optionStyle={styles.optionSelected}
              />
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
