import { Header } from "@/src/components/server/header/header";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<p>Wait...</p>}>
        <Header />
      </Suspense>
      {children}
    </div>
  );
}
