"use client";

import { IBook } from "@/src/models/book";
import { isAuthor } from "@/src/shared/types/typeGuards";
import { BookCard } from "../bookCard/bookCard";
import { useCarousel } from "./useCarousel";

export interface ItemsProps {
  items: IBook[];
}

export function Items({ items }: ItemsProps) {
  const { scrollRef } = useCarousel();

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar w-full"
    >
      {items.map((item) => (
        <BookCard
          key={item._id.toString()}
          title={item.title}
          authorName={isAuthor(item.authorId) ? item.authorId.name : "Unknown author"}
        />
      ))}
    </div>
  );
}
