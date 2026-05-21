import { getAllBooks, getBookById } from "@/lib/modules/books/books";
import { getGenresById } from "@/lib/modules/genres/genres";
import { getReviewsByBookId } from "@/lib/modules/reviews/reviews";
import { auth } from "@/src/auth";
import { notFound } from "next/navigation";
import { BookPage } from "./components/bookPage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const books = await getAllBooks();
  if (!books) return [];
  return books?.map((book) => ({ id: book._id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Book",
  });

  const book = await getBookById(id);
  const image = book?.image ?? "/default-book-cover.png";

  if (!book) {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  const description = book.description?.slice(0, 160);

  return {
    title: book.title,
    description,

    openGraph: {
      title: book.title,
      description,
      images: [
        {
          url: image,
          width: 600,
          height: 900,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: book.title,
      description,
      images: [image],
    },

    alternates: {
      canonical: `/books/${id}`,
    },
  };
}

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth();

  const book = await getBookById(id);
  if (!book) return notFound();

  const [genres, reviews] = await Promise.all([
    getGenresById(book?.genres),
    getReviewsByBookId(book._id),
  ]);

  return <BookPage book={book} genres={genres} session={session} reviews={reviews} />;
}
