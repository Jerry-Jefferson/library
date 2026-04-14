import { Header } from "@/src/components/server/header/header";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<p>Wait...</p>}>
        <Header />
      </Suspense>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
