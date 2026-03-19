import { getAllBooks, getBookById } from "@/lib/modules/books/books";
import { Suspense } from "react";
import { BookPage } from "./components/bookPage";

export async function generateStaticParams() {
  const books = await getAllBooks();
  return books?.map((book) => ({ id: book._id }));
}

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <Suspense fallback={<p>Wait...</p>}>
      <BookPage book={book} />
    </Suspense>
  );
}
