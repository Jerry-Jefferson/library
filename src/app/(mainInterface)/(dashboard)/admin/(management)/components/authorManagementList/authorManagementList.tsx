"use client";

import { deleteAuthor } from "@/lib/modules/authors/authors.actions";
import { Button } from "@/src/components/client/button/button";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import Pagination from "@/src/components/client/pagination/pagination";
import MultiSelect from "@/src/components/client/select/multiSelect";
import SingleSelect from "@/src/components/client/select/singleSelect";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
import { authorSortOptions, SortOption } from "@/src/shared/constants/sortOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { AuthorCreationForm } from "../../../author/components/authorCreationForm/authorCreationForm";

export interface AuthorManagementListProps {
  genres: IGenreSerialized[] | null;
  authors: IAuthorSerialized[];
  currentPage: number;
  totalPages: number;
  selectedGenres: string[];
}
export function AuthorManagementList({
  genres,
  authors,
  currentPage,
  totalPages,
  selectedGenres,
}: AuthorManagementListProps) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedAuthor, setSelectedAuthor] = useState<IAuthorSerialized | null>(null);

  function handleOpen(author: IAuthorSerialized, modalType: ModalType) {
    setSelectedAuthor(author);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteAuthor(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      closeModal();
      toast.success(result.message);
      setSelectedAuthor(null);
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
  const [selectedSort, setSelectedSort] = useState<SortOption<IAuthorSerialized> | null>(null);

  const displayedAuthors = useMemo(() => {
    if (!selectedSort) return authors;
    return [...authors].sort(selectedSort.comparator);
  }, [authors, selectedSort]);

  if (!authors || authors.length === 0) return <p>No authors found</p>;
  return (
    <div className="w-full flex bg-background">
      <div className="w-full gap-4 flex flex-col mt-3 m5-10">
        <div className="flex gap-5 w-full justify-center sm:justify-end mt-5">
          <div className="flex flex-col gap-3 max-w-[2/4] sm:flex-row">
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
            <SingleSelect<SortOption<IAuthorSerialized>>
              items={authorSortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              placeholder="Sort by..."
              label="Sort Authors"
            />
          </div>
        </div>

        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-4">
          {displayedAuthors.map((author) => {
            const hasBooks = Boolean(author.books.length);
            return (
              <div key={author._id} className="relative">
                <div className="absolute top-2 right-2 md:top-5 md:right-5 z-10 flex flex-col gap-2 md:gap-3">
                  <Tooltip helpText={hasBooks ? "Author has books" : ""}>
                    <Button
                      size="small"
                      className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all enabled:hover:scale-110"
                      disabled={hasBooks}
                      onClick={() => handleOpen(author, "delete")}
                    >
                      <MdDelete className="text-sm md:text-base text-black" />
                    </Button>
                  </Tooltip>

                  <Button
                    size="small"
                    className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all enabled:hover:scale-110"
                    onClick={() => handleOpen(author, "edit")}
                  >
                    <MdEdit className="text-sm md:text-base text-black" />
                  </Button>
                </div>
                <ItemCard name="author">
                  <div className="bg-card-back flex flex-col justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
                    <ItemCard.Avatar alt="author cover" src={author.image} view="rounded" />
                    <ItemCard.Title content={author.name} className="truncate" />
                  </div>
                </ItemCard>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
      {modal === "delete" && selectedAuthor && (
        <ModalWindow header="Author deletion" handleCancel={closeModal}>
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton="Cancel"
            acceptButton="Delete"
            handleDelete={() => handleDelete(selectedAuthor._id)}
            entity={selectedAuthor}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedAuthor && (
        <ModalWindow header={`${selectedAuthor.name} editing`} handleCancel={closeModal}>
          <AuthorCreationForm
            handleCancel={closeModal}
            cancelButton="Cancel"
            acceptButton="Save"
            editionData={selectedAuthor}
          />
        </ModalWindow>
      )}
    </div>
  );
}
