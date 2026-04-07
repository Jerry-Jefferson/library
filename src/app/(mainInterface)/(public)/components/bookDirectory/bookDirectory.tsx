"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import Pagination from "@/src/components/client/pagination/pagination";
import Multiselect from "@/src/components/client/multiselect/multiselect";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";

export interface BookDirectoryProps {
  books: IBookSerialized[];
  genres: IGenreSerialized[] | null;
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}

export function BookDirectory({
  books,
  genres,
  currentPage,
  totalPages,
  selectedGenres,
}: BookDirectoryProps) {
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

  const selected = genres?.filter((g) => selectedGenres.includes(g._id)) ?? [];

  if (!books || books.length === 0) return <p>No books found</p>;

  return (
    <div className="w-full min-h-dvh flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Books Directory</h2>
        <p className="text-xl text-secondary">
          Discover your next great read from our curated collection of timeless classics and modern
          masterpieces
        </p>
        <div className="flex w-full justify-end mt-5">
          {genres && (
            <div className="w-95 max-h-15">
              <Multiselect
                name="genres"
                label="Filter by genres"
                items={genres}
                value={selected}
                onChange={updateFilters}
                placeholder="Select genres..."
              />
            </div>
          )}
        </div>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
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
                  <LinkButton
                    href={`/books/${book._id}?from=${encodeURIComponent(
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
