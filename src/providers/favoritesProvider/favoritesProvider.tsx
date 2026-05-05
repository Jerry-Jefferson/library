import { auth } from "@/src/auth";
import { getFavoriteBooks } from "@/lib/modules/books/books";
import { FavoritesProvider } from "@/src/shared/context/useFavoritesStore";

export default async function FavoritesProviderServer({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userId = session?.user.id;

  const favoriteBooks = userId ? await getFavoriteBooks(userId) : [];

  const initialFavorites = favoriteBooks.map((b) => b._id);

  return <FavoritesProvider initialFavorites={initialFavorites}>{children}</FavoritesProvider>;
}
