"use client";

import { Button } from "@/src/components/client/button/button";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { routes } from "@/src/shared/constants/routes";
import { useSearchParams } from "next/navigation";

export function BookPage({ book }: { book: IBookSerialized | null }) {
  const searchParams = useSearchParams();
  const backPath = searchParams.get("from") || routes.books;

  if (!book) return <p>No book found</p>;

  return (
    <div className="w-full min-h-dvh flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <ItemCard name="book">
          <div className="flex gap-10 border-b border-secondary pb-12">
            <div className="w-[35%] flex flex-col gap-4 pt-4">
              <ItemCard.Avatar alt="book cover" src={book.imageUrl} view="rounded" />
              <Button content="Add to Favourites" padding="medium" className="font-bold" />
              <LinkButton href={backPath} className="py-4">
                Back to {backPath === routes.books ? "Book Directory" : "Home"}
              </LinkButton>
            </div>
            <div className="w-[65%] flex flex-col gap-6">
              <div>
                <ItemCard.Title content={book.title} className="font-bold" />
                <ItemCard.Information content={book.authorName} color="primary" />
              </div>
              <ItemCard.Badge genres={book.genres} />
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">Synopsis</h2>
                <ItemCard.Information content={book.description} color="secondary" />
              </div>
            </div>
          </div>
        </ItemCard>
      </div>
    </div>
  );
}
