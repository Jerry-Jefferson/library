"use client";

import ItemCard from "@/src/components/client/itemCard/itemCard";
import Pagination from "@/src/components/client/pagination/pagination";
import { Rating } from "@/src/components/client/rating/rating";
import MultiSelect from "@/src/components/client/select/multiSelect";
import SingleSelect from "@/src/components/client/select/singleSelect";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { routes } from "@/src/shared/constants/routes";
import { bookSortOptions, SortOption } from "@/src/shared/constants/sortOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BooksRenderProps } from "../booksContent/booksContent";

export function BookDirectory({
  books,
  genres,
  currentPage,
  totalPages,
  selectedGenres,
}: BooksRenderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilters = (value: IGenreSerialized[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const ids = value.map((genre) => genre._id);
    if (ids.length) params.set("genres", ids.join(","));
    else params.delete("genres");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const selected = genres?.filter((genre) => selectedGenres.includes(genre._id)) ?? [];
  const [selectedSort, setSelectedSort] = useState<SortOption<IBookSerialized> | null>(null);
  const displayedBooks = useMemo(() => {
    if (!selectedSort) return books;
    return [...books].sort(selectedSort.comparator);
  }, [books, selectedSort]);
  if (!books || books.length === 0) return <p>No books found</p>;

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Books Directory</h2>
        <p className="text-xl text-secondary">
          Discover your next great read from our curated collection of timeless classics and modern
          masterpieces
        </p>
        <div className="flex gap-5 w-full justify-end mt-5">
          <div className="flex gap-3 max-w-[2/4]">
            {genres && (
              <div className="min-w-85 max-w-85">
                <MultiSelect
                  multiple
                  name="genres"
                  label="Filter by genres"
                  items={genres}
                  value={selected}
                  onChange={updateFilters}
                  placeholder="Select genres..."
                />
              </div>
            )}
            <SingleSelect<SortOption<IBookSerialized>>
              items={bookSortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder="Sort by..."
              label="Sort Books"
            />
          </div>
        </div>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
          {displayedBooks.map((book) => (
            <div key={book._id}>
              <ItemCard name="book">
                <div className="bg-card-back flex flex-col justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
                  <ItemCard.Avatar alt="Book cover" src={book.imageUrl} view="rounded" />
                  <div className="flex items-center justify-between pt-2 pb-2">
                    <Rating rating={book.rating} />
                    <ItemCard.Favourite />
                  </div>
                  <ItemCard.Title content={book.title} className="truncate" />
                  <div className="flex justify-between pb-2">
                    <ItemCard.Information content={book.authorName} color="secondary" />
                    <ItemCard.Information content={book.year} color="secondary" />
                  </div>
                  <LinkButton
                    href={`${routes.books}/${book._id}?from=${encodeURIComponent(
                      `${pathname}?${searchParams.toString()}`
                    )}`}
                  >
                    View Information
                  </LinkButton>
                </div>
              </ItemCard>
            </div>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </div>
  );
}
