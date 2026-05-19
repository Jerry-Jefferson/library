"use client";

import { adminBarLinks } from "@/src/shared/constants/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ManagementBar() {
  const pathname = usePathname();
  const t = useTranslations("Entities");
  return (
    <div className="flex mt-5 sm:mt-0 gap-4 text-primary">
      {adminBarLinks.map((barLink) => {
        const isActive = pathname === barLink.href;
        return (
          <Link
            key={barLink.label}
            href={barLink.href}
            className={`transition-colors ${isActive ? "border-b-2 border-primary" : "hover:text-primary-hover "}`}
          >
            {t(barLink.label)}
          </Link>
        );
      })}
    </div>
  );
}
