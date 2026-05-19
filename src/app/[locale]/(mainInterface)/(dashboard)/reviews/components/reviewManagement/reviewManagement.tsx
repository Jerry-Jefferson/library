"use client";

import { deleteReview } from "@/lib/modules/reviews/review.actions";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { VirtualizerList } from "@/src/components/client/virtualizerList/virtualizerList";
import { IReviewSerialized } from "@/src/models/review";
import { formatDate } from "@/src/shared/utils/formatDate";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import { ReviewDisplay } from "../reviewDisplay/reviewDisplay";
import { ReviewForm } from "../reviewForm/reviewForm";

export function ReviewManagement({ userReviews }: { userReviews: IReviewSerialized[] }) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedReview, setSelectedReview] = useState<IReviewSerialized | null>(null);
  const t = useTranslations("");
  function handleOpen(review: IReviewSerialized, modalType: ModalType) {
    setSelectedReview(review);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteReview(id);
      if (!result.success) {
        toast.success(t(`Reviews.userMessages.${result.message}`));
        return;
      }
      closeModal();
      toast.success(t(`Reviews.userMessages.${result.message}`));
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
    <>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          {userReviews && userReviews.length > 0 ? (
            <VirtualizerList items={userReviews} isWindowScroll columns={2}>
              {(review) => (
                <ErrorBoundary
                  title={review.bookTitle}
                  message={t("Common.cardWentWild")}
                  retryLabel={t("Common.retry")}
                  failedLabel={t("Common.contentFailed")}
                >
                <ReviewDisplay
                  review={review}
                  rating={review.rating}
                  date={formatDate(review.createdAt)}
                  comment={review.comment}
                  bookName={review.bookTitle}
                  isDashboard
                  handleOpen={handleOpen}
                />
                </ErrorBoundary>
              )}
            </VirtualizerList>
          ) : (
            <div className="flex items-center justify-center p-4 bg-background border border-secondary rounded-md">
              <p className="text-secondary">{t("Reviews.noReviewsWritten")}</p>
            </div>
          )}
        </div>
      {modal === "delete" && selectedReview && (
        <ModalWindow
          header={t("Common.deletion", {
            entity: t("Entities.review.deletion"),
          })}
          handleCancel={handleCancel}
        >
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.delete")}
            handleDelete={() => handleDelete(selectedReview._id)}
            entity={selectedReview}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedReview && (
        <ModalWindow
          header={t("Reviews.editReviews", { bookName: selectedReview.bookTitle })}
          handleCancel={handleCancel}
        >
          <ReviewForm
            handleCancel={handleCancel}
            cancelButton={t("Common.cancel")}
            acceptButton={t("Common.saveChanges")}
            editionData={selectedReview}
            bookId={selectedReview.bookId}
          />
        </ModalWindow>
      )}
    </>
  );
}
