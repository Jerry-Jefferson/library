import { Sidebar } from "./components/sidebar/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
