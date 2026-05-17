import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";
import { getTranslations } from "next-intl/server";

export default async function Favourites() {
  const tCommon = await getTranslations("Common");
  const tEntity = await getTranslations("Entities");
  const t = await getTranslations("Favorites");
  return (
    <Suspense
      fallback={
        <p>
          {tCommon("loading", {
            entity: tEntity("favorites.loading"),
          })}
        </p>
      }
    >
      <div className="w-full flex justify-center bg-background">
        <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
          <h2 className="text-5xl sm:text-6xl font-bold">{t("masterpieces")}</h2>
          <p className="text-lg sm:text-xl text-secondary">{t("description")}</p>
          <FavoritesList />
        </div>
      </div>
    </Suspense>
  );
}
