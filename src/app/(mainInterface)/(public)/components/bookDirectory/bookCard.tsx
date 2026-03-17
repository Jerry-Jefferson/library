"use client";

import ItemCard from "@/src/components/client/itemCard/itemCard";
import { IBook } from "@/src/models/book";

export function BookCard({ book }: { book: IBook | null }) {
  if (!book) return <p>No book found</p>;

  return (
    <div>
      <ItemCard name="book">
        <ItemCard.Avatar alt="book cover" src={book.imageUrl} view="rounded" />
        <ItemCard.Title content={book.title} />
      </ItemCard>
    </div>
  );
}
