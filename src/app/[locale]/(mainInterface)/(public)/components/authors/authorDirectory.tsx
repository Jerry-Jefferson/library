"use client";

import { Button } from "@/src/components/client/button/button";
import EmptyState from "@/src/components/client/emptyState/emptyState";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import Pagination from "@/src/components/client/pagination/pagination";
import MultiSelect from "@/src/components/client/select/multiSelect";
import SingleSelect from "@/src/components/client/select/singleSelect";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { routes } from "@/src/shared/constants/routes";
import { authorSortOptions, SortOption } from "@/src/shared/constants/sortOptions";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export interface AuthorDirectoryProps {
  authors: IAuthorSerialized[];
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
  const t = useTranslations("");

  const updateFilters = (value: IGenreSerialized[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const ids = value.map((genre) => genre._id);
    if (ids.length) params.set("genres", ids.join(","));
    else params.delete("genres");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const selected = genres?.filter((genre) => selectedGenres.includes(genre._id)) ?? [];
  const [selectedSort, setSelectedSort] = useState<SortOption<IAuthorSerialized> | null>(null);

  const displayedAuthors = useMemo(() => {
    if (!selectedSort) return authors;
    return [...authors].sort(selectedSort.comparator);
  }, [authors, selectedSort]);

  const localizedSortOptions = useMemo(() => {
    return authorSortOptions.map((option) => ({
      ...option,
      title: t(`Authors.sortOptions.${option._id}`),
    }));
  }, [t]);

  if (!authors || authors.length === 0)
    return (
      <EmptyState
        title={t("Authors.noAuthors")}
        description={t("Authors.authorsAppearSoon")}
        path={routes.authors}
        buttonLabel={t("Authors.toBooksPage")}
      >
        <p className="text-secondary">{t("Common.tryToReload")}</p>
        <Button size="small" variant="primary" onClick={() => window.location.reload()}>
          {t("Common.reloadPage")}
        </Button>
      </EmptyState>
    );

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">{t("Authors.authorsDirectory")}</h2>
        <p className="text-xl text-secondary">{t("Authors.description")}</p>
        <div className="flex gap-5 w-full justify-center sm:justify-end mt-5">
          <div className="flex flex-col gap-3 max-w-[2/4] sm:flex-row">
            {genres && (
              <div className="min-w-85 max-w-85">
                <MultiSelect
                  multiple
                  name="genres"
                  label={t("Common.filterBy", {
                    entity: t("Entities.genres.filter"),
                  })}
                  items={genres}
                  value={selected}
                  onChange={updateFilters}
                  placeholder={t("Common.select", {
                    entity: t("Entities.genres.genres"),
                  })}
                />
              </div>
            )}
            <SingleSelect<SortOption<IAuthorSerialized>>
              items={localizedSortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder={t("Common.sort")}
              label={t("Common.sortBy", {
                entity: t("Entities.authors.sort"),
              })}
            />
          </div>
        </div>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {displayedAuthors.map((author: IAuthorSerialized) => (
            <ErrorBoundary
              key={author._id}
              title={author.name}
              message={t("Common.cardWentWild")}
              retryLabel={t("Common.retry")}
              failedLabel={t("Common.contentFailed")}
            >
              <ItemCard name="Author">
                <div className="bg-card-back flex flex-col justify-between gap-15 p-6 rounded-xl h-full border border-neutral-dark">
                  <div className="flex flex-col items-center gap-4 grow">
                    <ItemCard.Avatar src={author.image} alt={author.name} view="circle" />
                    <ItemCard.Title
                      content={author.name}
                      className="font-bold text-center truncate"
                    />
                    <ItemCard.Information
                      color="secondary"
                      content={author.bio}
                      className="text-center whitespace-normal line-clamp-2"
                    />
                  </div>
                  <LinkButton
                    href={`${routes.authors}/${author._id}?from=${encodeURIComponent(
                      `${pathname}?${searchParams.toString()}`
                    )}`}
                  >
                    {t("Common.viewInfo")}
                  </LinkButton>
                </div>
              </ItemCard>
            </ErrorBoundary>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </div>
  );
}
