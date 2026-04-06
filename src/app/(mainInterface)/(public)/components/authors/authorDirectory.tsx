"use client";

import DefaultAvatar from "@/public/default-avatar.png";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import Multiselect from "@/src/components/client/multiselect/multiselect";
import Pagination from "@/src/components/client/pagination/pagination";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export interface AuthorDirectoryProps {
  authors: IAuthorSerialized[] | null;
  genres: IGenreSerialized[] | null;
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}
export default function AuthorDirectory({
  authors,
  genres,
  currentPage,
  totalPages,
  selectedGenres,
}: AuthorDirectoryProps) {
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

  if (!authors || authors.length === 0) return <p>No authors found</p>;

  return (
    <div className="w-full min-h-dvh flex justify-center bg-background">
      <div className="w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">Authors Directory</h2>
        <div className="flex w-full justify-end">
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
        <p className="text-xl text-secondary">
          Meet the brilliant minds behind our collection of over 50,000 titles.
        </p>
        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10">
          {authors.map((author: IAuthorSerialized) => (
            <ItemCard key={author._id} name="Author">
              <div className="bg-card-back flex flex-col justify-between gap-15 p-6 rounded-xl h-full border border-neutral-dark">
                <div className="flex flex-col items-center gap-4 grow">
                  <ItemCard.Avatar
                    src={author.imageUrl ?? DefaultAvatar}
                    alt={author.name}
                    view="circle"
                  />
                  <ItemCard.Title content={author.name} className="font-bold text-center" />
                  <ItemCard.Information
                    color="secondary"
                    content={author.bio}
                    className="text-center whitespace-normal"
                  />
                </div>
                <LinkButton
                  href={`/authors/${author._id}?from=${encodeURIComponent(
                    `${pathname}?${searchParams.toString()}`
                  )}`}
                >
                  View Information
                </LinkButton>
              </div>
            </ItemCard>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </div>
  );
}
