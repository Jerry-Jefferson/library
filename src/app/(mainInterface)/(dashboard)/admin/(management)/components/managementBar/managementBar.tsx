import { adminBarLinks } from "@/src/shared/constants/routes";
import Link from "next/link";

export function ManagementBar() {
  return (
    <div className="flex gap-4 text-primary">
      {adminBarLinks.map((barLink) => (
        <Link
          key={barLink.label}
          href={barLink.href}
          className="hover:text-primary-hover transition-colors"
        >
          {barLink.label}
        </Link>
      ))}
    </div>
  );
}
