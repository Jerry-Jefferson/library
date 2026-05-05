import { getAllBooks, getBookById } from "@/lib/modules/books/books";
import { getGenresById } from "@/lib/modules/genres/genres";
import { getReviewsByBookId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import User from "@/src/models/user";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookPage } from "./components/bookPage";

export async function generateStaticParams() {
  const books = await getAllBooks();
  if (!books) return [];
  return books?.map((book) => ({ id: book._id }));
}

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth();
  const userId = session?.user.id;

  const book = await getBookById(id);
  if (!book) return notFound();

  const [genres, reviews] = await Promise.all([
    getGenresById(book?.genres),
    getReviewsByBookId(book._id),
  ]);

  let isFavorite = false;

  if (userId) {
    const user = await User.findById(userId).select("favorites").lean<{ favorites: string[] }>();
    const favorites = user?.favorites ?? [];

    isFavorite = favorites.some((fav) => fav.toString() === book._id.toString());
  }

  return (
    <Suspense fallback={<p>Wait...</p>}>
      <BookPage
        book={book}
        genres={genres}
        session={session}
        reviews={reviews}
        isFavorite={isFavorite}
      />
    </Suspense>
  );
}
