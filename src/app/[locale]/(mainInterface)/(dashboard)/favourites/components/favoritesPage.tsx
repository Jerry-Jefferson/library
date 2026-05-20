import { getTranslations } from "next-intl/server";
import { FavoritesList } from "./favoritesList";

export default async function FavoritesPage() {
  const t = await getTranslations("Favorites");

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-5xl sm:text-6xl font-bold">{t("masterpieces")}</h2>

        <p className="text-lg sm:text-xl text-secondary">{t("description")}</p>

        <FavoritesList />
      </div>
    </div>
  );
}
