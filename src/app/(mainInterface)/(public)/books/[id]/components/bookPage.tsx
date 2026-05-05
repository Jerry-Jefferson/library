"use client";

import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { BACK_PATHS_LABELS, DEFAULT_LABEL } from "@/src/shared/constants/backPathsLabels";
import { routes } from "@/src/shared/constants/routes";
import { useFavorite } from "@/src/shared/hooks/useFavorite";
import { useSearchParams } from "next/navigation";

export type BookPageProps = {
  book: IBookSerialized;
  genres: IGenreSerialized[] | null;
};

export function BookPage({ book, genres }: BookPageProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  console.log(from);
  const backPath = from ? decodeURIComponent(from) : routes.home;

  const normalizedPath = backPath.split("?")[0];
  const label = BACK_PATHS_LABELS[normalizedPath] ?? DEFAULT_LABEL;

  const { isFavorite: fav, toggle } = useFavorite({
    bookId: book._id,
  });

  if (!book) return <p>No book found</p>;

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <ItemCard name="book">
          <div className="flex items-start gap-10 border-b border-secondary pb-12">
            <div className="w-[35%] flex flex-col gap-4 pt-4">
              <ItemCard.Avatar alt="book cover" src={book.image} view="rounded" />
              <Button
                fullWidth
                size="medium"
                variant={fav ? "secondary" : "primary"}
                onClick={toggle}
                className="font-bold"
              >
                {fav ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              <LinkButton href={backPath} className="py-4">
                Back to {label ?? DEFAULT_LABEL}
              </LinkButton>
            </div>
            <div className="w-[65%] flex flex-col gap-6">
              <div>
                <ItemCard.Title content={book.title} className="font-bold" />
                <ItemCard.Information content={book.authorName} color="primary" />
              </div>
              <ItemCard.Badge genres={genres} />
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(12px,0.5rem+3cqw,24px)] font-bold">Synopsis</h2>
                <Collapse>
                  {({ className, toggle, isShownFull, isTruncated, textRef }) => (
                    <>
                      <ItemCard.Information
                        content={book.description}
                        color="secondary"
                        className={className}
                        ref={textRef}
                      />
                      {isTruncated && (
                        <Button
                          variant="custom"
                          onClick={toggle}
                          className="hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)]"
                        >
                          {isShownFull ? "Collapse" : "Read more"}
                        </Button>
                      )}
                    </>
                  )}
                </Collapse>
              </div>
            </div>
          </div>
        </ItemCard>
      </div>
    </div>
  );
}
