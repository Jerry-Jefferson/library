import { auth } from "@/src/auth";
import { getFavoriteBooks } from "@/lib/modules/books/books";
import List from "./list";
export async function FavoritesList() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return <p>Please log in</p>;

  const books = await getFavoriteBooks(userId);

  if (!books.length) return <p>No favorites yet</p>;

  return (
    <>
      <List books={books} />
    </>
  );
}
