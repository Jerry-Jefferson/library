"use client";

import HP from "@/public/HP.jpg";
import ArrowLeft from "@/public/left.png";
import ArrowRight from "@/public/right.png";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { IBook } from "@/src/models/book";
import { isAuthor } from "@/src/shared/types/typeGuards";
import { ReactNode } from "react";
import { EmblaCarousel } from "../emblaCarousel/emblaCarousel";

export interface BookSectionProps {
  children: ReactNode;
  books: IBook[] | null;
}

export function BookSection({ children, books }: BookSectionProps) {
  if (!books) return <p>No books found</p>;

  return (
    <section className="box-border flex flex-col gap-4 p-6 w-full">
      {children}
      <EmblaCarousel>
        <EmblaCarousel.Switcher src={ArrowLeft} direction="backward" />
        <EmblaCarousel.Container>
          {books.map((book) => (
            <EmblaCarousel.Slide key={book._id}>
              <ItemCard name="Book">
                <div className="flex flex-col gap-1">
                  <ItemCard.Avatar alt={book.title} src={HP} view="rounded" />
                  <ItemCard.Title content={book.title} />
                  <ItemCard.Information
                    color="secondary"
                    content={isAuthor(book.authorId) ? book.authorId.name : "Unknown author"}
                  />
                </div>
              </ItemCard>
            </EmblaCarousel.Slide>
          ))}
        </EmblaCarousel.Container>
        <EmblaCarousel.Switcher src={ArrowRight} direction="forward" />
      </EmblaCarousel>
    </section>
  );
}
