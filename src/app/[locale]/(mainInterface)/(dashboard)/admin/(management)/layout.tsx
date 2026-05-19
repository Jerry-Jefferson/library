import { ManagementBar } from "./components/managementBar/managementBar";

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <ManagementBar />
      <div>{children}</div>
    </div>
  );
}
