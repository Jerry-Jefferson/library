import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-secondary p-6">
        <div className="text-primary flex flex-col gap-2">
          <Link href={"/admin/book"} className="hover:text-primary-hover">
            Add New Book
          </Link>
          <Link href={"/admin/author"} className="hover:text-primary-hover">
            Add New Author
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
