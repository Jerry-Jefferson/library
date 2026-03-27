"use client";

import HP from "@/public/HP.jpg";
import ArrowLeft from "@/public/left.png";
import ArrowRight from "@/public/right.png";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { IBookSerialized } from "@/src/models/book";
import { routes } from "@/src/shared/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { EmblaCarousel } from "../emblaCarousel/emblaCarousel";

export const AUTHOR_PATH_REGEX = /^\/authors\/[^/]+$/;
export const isAuthorPage = (pathname: string) => AUTHOR_PATH_REGEX.test(pathname);
export interface BookSectionProps {
  children: ReactNode;
  books: IBookSerialized[] | null;
}

export function BookSection({ children, books }: BookSectionProps) {
  const pathname = usePathname();

  if (!books || books.length === 0) return <p>No books found</p>;

  return (
    <section className="box-border flex flex-col gap-4 w-full">
      {children}
      <EmblaCarousel>
        <EmblaCarousel.Switcher src={ArrowLeft} direction="backward" />
        <EmblaCarousel.Container>
          {books.map((book) => (
            <EmblaCarousel.Slide key={book._id}>
              <Link href={`${routes.book(book._id)}?from=${pathname}`}>
                <ItemCard name="Book">
                  <div className="flex flex-col gap-1">
                    <ItemCard.Avatar alt={book.title} src={HP} view="rounded" />
                    <ItemCard.Title content={book.title} className="truncate" />
                    <ItemCard.Information
                      color="secondary"
                      content={isAuthorPage(pathname) ? book.year : book.authorName}
                    />
                  </div>
                </ItemCard>
              </Link>
            </EmblaCarousel.Slide>
          ))}
        </EmblaCarousel.Container>
        <EmblaCarousel.Switcher src={ArrowRight} direction="forward" />
      </EmblaCarousel>
    </section>
  );
}
