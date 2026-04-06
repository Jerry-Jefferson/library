"use client";
import useDebounce from "@/src/shared/hooks/useDebounce";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { useMemo, useState } from "react";

export const MAX_VISIBLE = 3;

export type SelectItemType = {
  _id: string;
  title: string;
};

export interface MultiselectProps<T extends SelectItemType> {
  items: T[];
  name: string;
  label?: string;
  isDisabled?: boolean;
  value: T[];
  onChange: (value: T[]) => void;
}

export default function Multiselect<T extends SelectItemType>({
  items,
  label,
  isDisabled = false,
  name,
  value,
  onChange,
}: MultiselectProps<T>) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 800);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return items;
    return items.filter((item) => item.title.toLowerCase().includes(debouncedQuery.toLowerCase()));
  }, [items, debouncedQuery]);

  const visibleItems = query ? [] : value.slice(0, MAX_VISIBLE);
  const hiddenCount = value.length - visibleItems.length;

  return (
    <Field disabled={isDisabled} className="w-full max-w-md">
      {label && <Label className="block text-sm font-medium text-gray-700 mb-1">{label}</Label>}

      <Combobox
        as="div"
        immediate
        multiple
        name={name}
        value={value}
        onChange={onChange}
        onClose={() => setQuery("")}
        className="relative w-full"
        by="_id"
      >
        <div className="relative">
          <div
            className="flex flex-wrap items-center gap-2 w-full rounded-md border border-primary px-2 py-2
                       focus-within:ring-1 focus-within:ring-primary"
          >
            {!query &&
              visibleItems.map((item) => (
                <span
                  key={item._id}
                  className="flex items-center gap-1 bg-primary text-neutral-dark text-xs px-2 py-1 rounded-md"
                >
                  {item.title}
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(value.filter((value) => value._id !== item._id));
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}

            {!query && hiddenCount > 0 && (
              <span className="text-xs text-foreground">+{hiddenCount}</span>
            )}

            <ComboboxInput
              aria-label={`${name} items`}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm min-w-20"
              placeholder={value.length && !query ? "" : "Search..."}
            />
          </div>
        </div>

        <ComboboxOptions className="absolute left-0 top-full w-full mt-2 rounded-lg border border-primary bg-background shadow-lg z-10">
          {filteredItems.length === 0 && <div className="px-3 py-2 text-sm">Nothing found</div>}

          {filteredItems.map((item) => (
            <ComboboxOption
              key={item._id}
              value={item}
              className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm
                         data-focus:bg-primary
                         data-selected:bg-primary-hover data-selected:text-neutral-dark"
            >
              {({ selected }) => (
                <>
                  <span>{item.title}</span>
                  {selected && <span className="text-xs text-neutral-dark">✓</span>}
                </>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
