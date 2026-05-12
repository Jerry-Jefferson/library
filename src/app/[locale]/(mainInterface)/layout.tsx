import { Header } from "@/src/components/server/header/header";
import FavoritesProviderServer from "@/src/providers/favoritesProvider/favoritesProvider";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<p>Wait...</p>}>
        <Header />
        <div className="flex-1 flex flex-col">
          <FavoritesProviderServer>{children}</FavoritesProviderServer>
        </div>
      </Suspense>
    </div>
  );
}
