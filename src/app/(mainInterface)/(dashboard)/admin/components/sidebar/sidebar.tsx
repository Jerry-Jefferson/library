import { routes } from "@/src/shared/constants/routes";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="@container w-[15%] border-r border-secondary p-6">
      <div className="text-primary flex flex-col gap-2">
        <Link
          href={routes.bookCreation}
          className="text-[clamp(12px,5cqw+10px,20px)] hover:text-primary-hover transition-colors"
        >
          Add New Book
        </Link>
        <Link
          href={routes.authorCreation}
          className="text-[clamp(12px,5cqw+10px,20px)] hover:text-primary-hover transition-colors"
        >
          Add New Author
        </Link>
      </div>
    </aside>
  );
}
