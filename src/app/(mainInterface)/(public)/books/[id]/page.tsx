import { getAllBooks, getBookById } from "@/lib/modules/books/books";
import { getGenresById } from "@/lib/modules/genres/genres";
import { SessionFetcher } from "@/src/components/server/sessionFetcher/sessionFetcher";
import { Suspense } from "react";
import { BookPage } from "./components/bookPage";

export async function generateStaticParams() {
  const books = await getAllBooks();
  if (!books) return [];
  return books?.map((book) => ({ id: book._id }));
}

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) return null;

  const genres = await getGenresById(book?.genres);

  return (
    <Suspense fallback={<p>Wait...</p>}>
      <SessionFetcher>
        {(data) => <BookPage book={book} genres={genres} {...data} />}
      </SessionFetcher>
    </Suspense>
  );
}
