"use client";

import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { Rating } from "@/src/components/client/rating/rating";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { routes } from "@/src/shared/constants/routes";
import { useFavoritesStore } from "@/src/shared/context/useFavoritesStore";
import { useTranslations } from "next-intl";

export type BookListProps = {
  books: IBookSerialized[];
};

export default function BookList({ books }: BookListProps) {
  const { isFavorite } = useFavoritesStore();
  const t = useTranslations("Common");
  const visibleBooks = books.filter((book) => isFavorite(book._id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {visibleBooks.map((book) => (
        <ErrorBoundary
          key={book._id}
          title={book.title}
          message={t("cardWentWild")}
          retryLabel={t("retry")}
          failedLabel={t("contentFailed")}
        >
          <ItemCard name="book">
            <div className="bg-card-back flex flex-col justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
              <ItemCard.Avatar alt="Book cover" src={book.image} view="rounded" />

              <div className="flex items-center justify-between pt-2 pb-2">
                <Rating rating={book.rating} />
                <ItemCard.Favorite bookId={book._id} />
              </div>

              <ItemCard.Title content={book.title} className="truncate" />

              <div className="flex justify-between pb-2">
                <ItemCard.Information content={book.authorName} color="secondary" />
                <ItemCard.Information content={book.year} color="secondary" />
              </div>

              <LinkButton
                href={`${routes.books}/${book._id}?from=${encodeURIComponent(routes.favourites)}`}
              >
                {t("viewInfo")}
              </LinkButton>
            </div>
          </ItemCard>
        </ErrorBoundary>
      ))}
    </div>
  );
}
