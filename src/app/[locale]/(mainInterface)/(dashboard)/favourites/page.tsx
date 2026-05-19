import { ItemsSkeleton } from "@/src/app/(mainInterface)/components/itemsSkeleton/itemsSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";

export default async function Favourites() {
  const t = await getTranslations("Favorites");

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-5xl sm:text-6xl font-bold">{t("masterpieces")}</h2>
        <p className="text-lg sm:text-xl text-secondary">{t("description")}</p>
        <Suspense
          fallback={
            <ItemsSkeleton
              className="h-[580px]"
              gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              itemsNumber={8}
              withSort={false}
            />
          }
        >
          <FavoritesList />
        </Suspense>
      </div>
    </div>
  );
}
