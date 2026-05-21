import { getFavoriteBooks } from "@/lib/modules/books/books";
import { auth } from "@/src/auth";
import EmptyState from "@/src/components/client/emptyState/emptyState";
import { routes } from "@/src/shared/constants/routes";
import { getTranslations } from "next-intl/server";
import BooksList from "./components/booksList";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../components/itemsSkeleton/itemsSkeleton";

interface FavoritesProps {
  params: Promise<{ locale: string }>;
}

export default async function Favourites({ params }: FavoritesProps) {
  const { locale } = await params;

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return <p>Please log in</p>;

  const t = await getTranslations({
    locale,
    namespace: "Favorites",
  });

  const favoriteBooks = await getFavoriteBooks(userId);

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-5xl sm:text-6xl font-bold">{t("masterpieces")}</h2>
        <p className="text-lg sm:text-xl text-secondary">{t("description")}</p>
        {!favoriteBooks?.length ? (
          <EmptyState
            title={t("noFavorites")}
            description={t("foundFavorites")}
            path={routes.books}
            buttonLabel={t("toBookPage")}
          />
        ) : (
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
            <BooksList books={favoriteBooks} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
