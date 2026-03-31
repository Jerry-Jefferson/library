import { getAllBooks } from "@/lib/modules/books/books";
import { BookDirectory } from "../components/bookDirectory/bookDirectory";
import { Suspense } from "react";

export default async function Books() {
  const books = await getAllBooks();

  return (
    <Suspense fallback={<div>Loading books...</div>}>
      <BookDirectory books={books} />
    </Suspense>
  );
}
