"use client";

import ItemCard from "@/src/components/client/itemCard/itemCard";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { routes } from "@/src/shared/constants/routes";

export function BookDirectory({ books }: { books: IBookSerialized[] | null }) {
  if (!books || books.length === 0) return <p>No books found</p>;

  return (
    <div className="w-full min-h-dvh flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Books Directory</h2>
        <p className="text-xl text-secondary">
          Discover your next great read from our curated collection of timeless classics and modern
          masterpieces
        </p>
        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10">
          {books.map((book) => (
            <div key={book._id}>
              <ItemCard name="book">
                <div className="bg-card-back flex flex-col justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
                  <ItemCard.Avatar alt="Book cover" src={book.imageUrl} view="rounded" />
                  <div className="flex justify-between pt-2 pb-2">
                    <p>rating</p>
                    <ItemCard.Favourite />
                  </div>
                  <ItemCard.Title content={book.title} className="truncate" />
                  <div className="flex justify-between pb-2">
                    <ItemCard.Information content={book.authorName} color="secondary" />
                    <ItemCard.Information content={book.year} color="secondary" />
                  </div>
                  <LinkButton href={routes.book(book._id)}>View Information</LinkButton>
                </div>
              </ItemCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
