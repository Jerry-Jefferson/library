import { getAllBooks } from "@/lib/modules/books/books";
import { BookDirectory } from "../components/bookDirectory/bookDirectory";

export default async function Books() {
  const books = await getAllBooks();

  return <BookDirectory books={books} />;
}
