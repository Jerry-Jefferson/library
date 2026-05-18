"use client";

import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
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
        <EmblaCarousel.Switcher direction="backward" />
        <EmblaCarousel.Container>
          {books.map((book) => (
            <EmblaCarousel.Slide key={book._id}>
              <ErrorBoundary
                title={book.title}
                message="The card went wild"
                className="min-h-[400px]"
              >
                <Link href={`${routes.book(book._id)}?from=${pathname}`}>
                  <ItemCard name="Book">
                    <div className="flex flex-col gap-1">
                      <ItemCard.Avatar alt={book.title} src={book.image} view="rounded" />
                      <ItemCard.Title content={book.title} className="truncate" />
                      <ItemCard.Information
                        color="secondary"
                        content={isAuthorPage(pathname) ? book.year : book.authorName}
                        className="line-clamp-1"
                      />
                    </div>
                  </ItemCard>
                </Link>
              </ErrorBoundary>
            </EmblaCarousel.Slide>
          ))}
        </EmblaCarousel.Container>
        <EmblaCarousel.Switcher direction="forward" />
      </EmblaCarousel>
    </section>
  );
}
