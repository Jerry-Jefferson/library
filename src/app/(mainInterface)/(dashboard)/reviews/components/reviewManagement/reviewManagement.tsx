"use client";

import { deleteReview } from "@/lib/modules/reviews/review.actions";
import { DeleteMessage } from "@/src/components/client/deleteMessageComponent/deleteMessage";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { VirtualizerList } from "@/src/components/client/virtualizerList/virtualizerList";
import { IReviewSerialized } from "@/src/models/review";
import { formatDate } from "@/src/shared/utils/formatDate";
import { useState } from "react";
import { toast } from "react-toastify";
import { ReviewDisplay } from "../reviewDisplay/reviewDisplay";
import { ReviewForm } from "../reviewForm/reviewForm";

export function ReviewManagement({ userReviews }: { userReviews: IReviewSerialized[] }) {
  const { modal, openModal, closeModal } = useModalQuery();
  const [selectedReview, setSelectedReview] = useState<IReviewSerialized | null>(null);

  function handleOpen(review: IReviewSerialized, modalType: ModalType) {
    setSelectedReview(review);
    openModal(modalType);
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteReview(id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      closeModal();
      toast.success(result.message);
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
        <h2 className="text-6xl font-bold">Your Reviews</h2>
        <p className="text-xl text-secondary">
          Your literary legacy in one place: rediscover your past reviews and track how your
          perspective has evolved over time
        </p>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          {userReviews && userReviews.length > 0 ? (
            <VirtualizerList items={userReviews} isWindowScroll columns={2}>
              {(review) => (
                <ErrorBoundary title={review.bookTitle} message="The card went wild">
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
              <p className="text-secondary">You have not written any reviews yet</p>
            </div>
          )}
        </div>
      </div>
      {modal === "delete" && selectedReview && (
        <ModalWindow header="Review deletion" handleCancel={handleCancel}>
          <DeleteMessage
            handleCancel={closeModal}
            cancelButton="Cancel"
            acceptButton="Delete"
            handleDelete={() => handleDelete(selectedReview._id)}
            entity={selectedReview}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedReview && (
        <ModalWindow
          header={`"${selectedReview.bookTitle}" review editing`}
          handleCancel={handleCancel}
        >
          <ReviewForm
            handleCancel={handleCancel}
            cancelButton="Cancel"
            acceptButton="Save"
            editionData={selectedReview}
            bookId={selectedReview.bookId}
          />
        </ModalWindow>
      )}
    </div>
  );
}
