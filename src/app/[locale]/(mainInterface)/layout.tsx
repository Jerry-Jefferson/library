import { Spinner } from "@/src/components/client/spinner/spinner";
import { Header } from "@/src/components/server/header/header";
import FavoritesProviderServer from "@/src/providers/favoritesProvider/favoritesProvider";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner width="100px" color="green" />
          </div>
        }
      >
        <Header />
        <div className="flex-1 flex flex-col">
          <FavoritesProviderServer>{children}</FavoritesProviderServer>
        </div>
      </Suspense>
    </div>
  );
}
