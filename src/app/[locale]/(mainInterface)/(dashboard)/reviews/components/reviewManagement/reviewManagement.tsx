"use client";

import { deleteReview } from "@/lib/modules/reviews/review.actions";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { VirtualizerList } from "@/src/components/client/virtualizerList/virtualizerList";
import { IReviewSerialized } from "@/src/models/review";
import { formatDate } from "@/src/shared/utils/formatDate";
import { useState } from "react";
import { toast } from "react-toastify";
import { ReviewDisplay } from "../reviewDisplay/reviewDisplay";
import { ReviewForm } from "../reviewForm/reviewForm";
import { useTranslations } from "next-intl";

export function ReviewManagement({ userReviews }: { userReviews: IReviewSerialized[] }) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedReview, setSelectedReview] = useState<IReviewSerialized | null>(null);
  const tReview = useTranslations("Reviews");
  const tCommon = useTranslations("Common");
  const tEntity = useTranslations("Entities");
  function handleOpen(review: IReviewSerialized, modalType: ModalType) {
    setSelectedReview(review);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteReview(id);
      if (!result.success) {
        toast.success(tReview(`userMessages.${result.message}`));
        return;
      }
      closeModal();
      toast.success(tReview(`userMessages.${result.message}`));
      setSelectedReview(null);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCancel = () => {
    closeModal();
    setSelectedReview(null);
  };
  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 gap-4 flex flex-col mt-10 mb-10">
        <h2 className="text-6xl font-bold">{tReview("yourReviews")}</h2>
        <p className="text-xl text-secondary">{tReview("description")}</p>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          {userReviews && userReviews.length > 0 ? (
            <VirtualizerList items={userReviews} isWindowScroll columns={2}>
              {(review) => (
                <ReviewDisplay
                  review={review}
                  rating={review.rating}
                  date={formatDate(review.createdAt)}
                  comment={review.comment}
                  bookName={review.bookTitle}
                  isDashboard
                  handleOpen={handleOpen}
                />
              )}
            </VirtualizerList>
          ) : (
            <div className="flex items-center justify-center p-4 bg-background border border-secondary rounded-md">
              <p className="text-secondary">{tReview("noReviewsWritten")}</p>
            </div>
          )}
        </div>
      </div>
      {modal === "delete" && selectedReview && (
        <ModalWindow
          header={tCommon("deletion", {
            entity: tEntity("review.deletion"),
          })}
          handleCancel={handleCancel}
        >
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton={tCommon("cancel")}
            acceptButton={tCommon("delete")}
            handleDelete={() => handleDelete(selectedReview._id)}
            entity={selectedReview}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedReview && (
        <ModalWindow
          header={tReview("editReviews", { bookName: selectedReview.bookTitle })}
          handleCancel={handleCancel}
        >
          <ReviewForm
            handleCancel={handleCancel}
            cancelButton={tCommon("cancel")}
            acceptButton={tCommon("saveChanges")}
            editionData={selectedReview}
            bookId={selectedReview.bookId}
          />
        </ModalWindow>
      )}
    </div>
  );
}
