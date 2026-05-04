import { auth } from "@/src/auth";
import { getFavoriteBooks } from "@/lib/modules/books/books";
import BooksList from "./booksList";

export async function FavoritesList() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return <p>Please log in</p>;

  const books = await getFavoriteBooks(userId);

  if (!books.length) return <p>No favorites yet</p>;

  return <BooksList books={books} />;
}
