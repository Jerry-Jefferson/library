import { Header } from "@/src/components/server/header/neader";
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
