import { Suspense } from "react";
import { FavoritesList } from "./components/favoritesList";
import { getTranslations } from "next-intl/server";

export default async function Favourites() {
  const tCommon = await getTranslations("Common");
  const tEntity = await getTranslations("Entities");
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
          <FavoritesList />
        </div>
      </div>
    </Suspense>
  );
}
