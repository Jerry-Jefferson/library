"use client";

import { adminBarLinks } from "@/src/shared/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ManagementBar() {
  const pathname = usePathname();
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
            {barLink.label}
          </Link>
        );
      })}
    </div>
  );
}
