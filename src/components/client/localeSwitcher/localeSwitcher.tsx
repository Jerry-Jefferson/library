"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";

const locales = [
  { id: "en", name: "En" },
  { id: "ru", name: "Ru" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative">
      <Menu>
        <MenuButton className="flex items-center gap-2 rounded-lg border px-4 py-2">
          {locales.find((l) => l.id === locale)?.name}

          <FiChevronDown className="transition data-open:rotate-180" />
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="mt-2 w-20 rounded-lg border bg-background p-1 shadow-lg"
        >
          {locales.map((l) => (
            <MenuItem key={l.id}>
              <button
                onClick={() => {
                  router.replace(pathname, {
                    locale: l.id,
                  });
                }}
                className="block w-full rounded-md px-3 py-2 text-left data-focus:bg-primary"
              >
                {l.name}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
