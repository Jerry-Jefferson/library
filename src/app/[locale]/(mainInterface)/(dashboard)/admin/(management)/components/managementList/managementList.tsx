"use client";

import { deleteBook } from "@/lib/modules/books/books.actions";
import { Button } from "@/src/components/client/button/button";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import Pagination from "@/src/components/client/pagination/pagination";
import MultiSelect from "@/src/components/client/select/multiSelect";
import SingleSelect from "@/src/components/client/select/singleSelect";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { bookSortOptions, SortOption } from "@/src/shared/constants/sortOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { BookCreationForm } from "../../../book/components/bookCreation/bookCreationForm";
import { useTranslations } from "next-intl";

export interface ManagementListProps {
  books: IBookSerialized[];
  genres: IGenreSerialized[] | null;
  authors: IAuthorSerialized[] | null;
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}
export function ManagementList({
  books,
  genres,
  authors,
  currentPage,
  totalPages,
  selectedGenres,
}: ManagementListProps) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedBook, setSelectedBook] = useState<IBookSerialized | null>(null);
  const t = useTranslations("");

  function handleOpen(book: IBookSerialized, modalType: ModalType) {
    setSelectedBook(book);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteBook(id);
      if (!result.success) {
        toast.error(t(`Books.userMessages.${result.message}`));
        return;
      }
      closeModal();
      toast.success(t(`Books.userMessages.${result.message}`));
      setSelectedBook(null);
    } catch (error) {
      console.error(error);
    }
  }

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

  const localizedSortOptions = useMemo(() => {
    return bookSortOptions.map((option) => ({
      ...option,
      title: t(`Books.sortOptions.${option._id}`),
    }));
  }, [t]);

  if (!books || books.length === 0) return <p>{t("Books.noBooks")}</p>;

  return (
    <div className="w-full flex bg-background">
      <div className="w-full gap-4 flex flex-col">
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
            <SingleSelect<SortOption<IBookSerialized>>
              items={localizedSortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder={t("Common.sort")}
              label={t("Common.sortBy", {
                entity: t("Entities.books.sort"),
              })}
            />
          </div>
        </div>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-4">
          {displayedBooks.map((book) => (
            <ErrorBoundary
              key={book._id}
              title={book.title}
              message={t("Common.cardWentWild")}
              retryLabel={t("Common.retry")}
              failedLabel={t("Common.contentFailed")}
            >
              <div className="relative">
                <div className="absolute top-2 right-2 md:top-5 md:right-5 z-10 flex flex-col gap-2 md:gap-3">
                  <Tooltip helpText={t("Common.delete")}>
                    <Button
                      size="small"
                      className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all hover:scale-110"
                      onClick={() => handleOpen(book, "delete")}
                    >
                      <MdDelete className="text-sm md:text-base text-black" />
                    </Button>
                  </Tooltip>
                  <Tooltip helpText={t("Common.edit")}>
                    <Button
                      size="small"
                      className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all hover:scale-110"
                      onClick={() => handleOpen(book, "edit")}
                    >
                      <MdEdit className="text-sm md:text-base text-black" />
                    </Button>
                  </Tooltip>
                </div>
                <ItemCard name="book">
                  <div className="bg-card-back flex flex-col justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
                    <ItemCard.Avatar alt="Book cover" src={book.image} view="rounded" />
                    <ItemCard.Title content={book.title} className="truncate" />
                    <div className="flex justify-between pb-2">
                      <ItemCard.Information
                        content={book.authorName}
                        color="secondary"
                        className="line-clamp-1"
                      />
                      <ItemCard.Information content={book.year} color="secondary" />
                    </div>
                  </div>
                </ItemCard>
              </div>
            </ErrorBoundary>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
      {modal === "delete" && selectedBook && (
        <ModalWindow
          header={t("Common.deletion", {
            entity: t("Entities.books.select"),
          })}
          handleCancel={closeModal}
        >
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.delete")}
            handleDelete={() => handleDelete(selectedBook._id)}
            entity={selectedBook}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedBook && (
        <ModalWindow
          header={t("Common.editing", {
            entity: t("Entities.books.select"),
          })}
          handleCancel={closeModal}
        >
          <BookCreationForm
            handleCancel={closeModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.edit")}
            editionData={selectedBook}
            genres={genres || []}
            authors={authors || []}
          />
        </ModalWindow>
      )}
    </div>
  );
}
