import { getFavoriteBooks } from "@/lib/modules/books/books";
import { auth } from "@/src/auth";
import BooksList from "./booksList";
import EmptyState from "@/src/components/client/emptyState/emptyState";
import { getTranslations } from "next-intl/server";
import { routes } from "@/src/shared/constants/routes";

export async function FavoritesList() {
  const session = await auth();
  const userId = session?.user.id;
  const t = await getTranslations("Favorites");
  if (!userId) return <p>Please log in</p>;

  const favoriteBooks = await getFavoriteBooks(userId);

  return !favoriteBooks.length ? (
    <EmptyState
      title={t("noFavorites")}
      description={t("foundFavorites")}
      path={routes.books}
      buttonLabel={t("toBookPage")}
    />
  ) : (
    <>
      <h2 className="text-5xl sm:text-6xl font-bold">{t("masterpieces")}</h2>
      <p className="text-lg sm:text-xl text-secondary">{t("description")}</p>
      <BooksList books={favoriteBooks} />
    </>
  );
}
