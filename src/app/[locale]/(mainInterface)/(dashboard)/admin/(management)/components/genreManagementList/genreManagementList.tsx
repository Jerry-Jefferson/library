"use client";

import { deleteGenre } from "@/lib/modules/genres/genres.actions";
import { Button } from "@/src/components/client/button/button";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { IGenreSerialized } from "@/src/models/genre";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { GenreCreationForm } from "../../../genre/components/genreCreation/genreCreationForm";
import { useTranslations } from "next-intl";

export interface ManagementListProps {
  genres: IGenreSerialized[] | null;
}
export function GenreManagementList({ genres }: ManagementListProps) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedGenre, setSelectedGenre] = useState<IGenreSerialized | null>(null);
  const t = useTranslations("");
  function handleOpen(genre: IGenreSerialized, modalType: ModalType) {
    setSelectedGenre(genre);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteGenre(id);
      if (!result.success) {
        toast.error(t(`Genres.userMessages.${result.message}`));
        return;
      }
      closeModal();
      toast.success(t(`Genres.userMessages.${result.message}`));
      setSelectedGenre(null);
    } catch (error) {
      console.error(error);
    }
  }

  if (!genres || genres.length === 0) return <p>{t("Genres.noGenres")}</p>;

  return (
    <div className="w-full flex bg-background">
      <div className="w-full gap-4 flex flex-col mt-5">
        <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre) => (
            <ErrorBoundary
              key={genre._id}
              title={genre.title}
              message={t("Common.cardWentWild")}
              retryLabel={t("Common.retry")}
              failedLabel={t("Common.contentFailed")}
            >
              <ItemCard name="genre">
                <div className="bg-card-back flex items-center justify-between gap-2 p-4 rounded-xl h-full border border-neutral-dark">
                  <ItemCard.Title content={genre.title} className="truncate" />
                  <div className="flex gap-2 md:gap-3">
                    <Tooltip helpText={t("Common.delete")}>
                      <Button
                        size="small"
                        className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all hover:scale-110"
                        onClick={() => handleOpen(genre, "delete")}
                      >
                        <MdDelete className="text-sm md:text-base text-black" />
                      </Button>
                    </Tooltip>
                    <Tooltip helpText={t("Common.edit")}>
                      <Button
                        size="small"
                        className="bg-fair shadow-lg shadow-black/40 p-2 md:p-3 transition-all hover:scale-110"
                        onClick={() => handleOpen(genre, "edit")}
                      >
                        <MdEdit className="text-sm md:text-base text-black" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </ItemCard>
            </ErrorBoundary>
          ))}
        </div>
      </div>
      {modal === "delete" && selectedGenre && (
        <ModalWindow
          header={t("Common.deletion", {
            entity: t("Entities.genres.editing"),
          })}
          handleCancel={closeModal}
        >
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.delete")}
            handleDelete={() => handleDelete(selectedGenre._id)}
            entity={selectedGenre}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedGenre && (
        <ModalWindow
          header={t("Common.editing", {
            entity: t("Entities.genres.editing"),
          })}
          handleCancel={closeModal}
        >
          <GenreCreationForm
            handleCancel={closeModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.saveChanges")}
            editionData={selectedGenre}
          />
        </ModalWindow>
      )}
    </div>
  );
}
