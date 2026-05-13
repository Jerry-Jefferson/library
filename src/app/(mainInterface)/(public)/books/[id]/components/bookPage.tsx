"use client";

import Quote from "@/public/quote.png";
import Sparkle from "@/public/sparkle.png";
import { ReviewDisplay } from "@/src/app/(mainInterface)/(dashboard)/reviews/components/reviewDisplay/reviewDisplay";
import { ReviewForm } from "@/src/app/(mainInterface)/(dashboard)/reviews/components/reviewForm/reviewForm";
import { Button } from "@/src/components/client/button/button";
import { Collapse } from "@/src/components/client/collapse/collapse";
import { ErrorBoundary } from "@/src/components/client/errorBoundary/errorBoundary";
import ItemCard from "@/src/components/client/itemCard/itemCard";
import { ModalWindow } from "@/src/components/client/modalWindow/modalWindow";
import { ModalType, useModalQuery } from "@/src/components/client/modalWindow/useModalQuery";
import { VirtualizerList } from "@/src/components/client/virtualizerList/virtualizerList";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { IReviewSerialized } from "@/src/models/review";
import { BACK_PATHS_LABELS, DEFAULT_LABEL } from "@/src/shared/constants/backPathsLabels";
import { routes } from "@/src/shared/constants/routes";
import { useFavorite } from "@/src/shared/hooks/useFavorite";
import { formatDate } from "@/src/shared/utils/formatDate";
import { Session } from "next-auth";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function BookPage({
  book,
  genres,
  reviews,
  session,
}: {
  book: IBookSerialized;
  genres: IGenreSerialized[] | null;
  reviews: IReviewSerialized[] | null;
  session: Session | null;
}) {
  const isAuthenticated = Boolean(session?.user);
  const userId = session?.user.id;
  const hasReviewed = reviews?.find((userReview) => userReview.userId === session?.user.id);

  const [selectedReview, setSelectedReview] = useState<IReviewSerialized | null>(null);

  const { modal, openModal, closeModal } = useModalQuery();
  const handleOpen = (review: IReviewSerialized, modalType: ModalType) => {
    setSelectedReview(review);
    openModal(modalType);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    closeModal();
  };

  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const backPath = from ? decodeURIComponent(from) : routes.home;

  const normalizedPath = backPath.split("?")[0];
  const label = BACK_PATHS_LABELS[normalizedPath] ?? DEFAULT_LABEL;

  const { isFavorite: fav, toggle } = useFavorite({
    bookId: book._id,
  });

  if (!book) return <p>No book found</p>;

  return (
    <div className="w-full flex justify-center bg-background">
      <div className="w-7/8 sm:w-4/5 gap-4 flex flex-col mt-10 mb-10">
        <ItemCard name="book">
          <div className="flex items-start gap-5 sm:gap-10 border-b border-secondary pb-12">
            <div className="w-[35%] flex flex-col gap-4 pt-4">
              <ItemCard.Avatar alt="book cover" src={book.image} view="rounded" />
              {isAuthenticated ? (
                <Button
                  fullWidth
                  size="medium"
                  variant={fav ? "secondary" : "primary"}
                  onClick={toggle}
                  className="font-bold"
                >
                  {fav ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              ) : null}
              <LinkButton href={backPath} className="py-4">
                Back to {label ?? DEFAULT_LABEL}
              </LinkButton>
            </div>
            <div className="w-[65%] flex flex-col gap-6">
              <div>
                <ItemCard.Title content={book.title} className="font-bold" />
                <ItemCard.Information content={book.authorName} color="primary" />
              </div>
              <ItemCard.Badge genres={genres} />
              <div className="flex flex-col gap-4">
                <h2 className="text-[clamp(12px,0.5rem+3cqw,24px)] font-bold">Synopsis</h2>
                <Collapse>
                  {({ className, toggle, isShownFull, isTruncated, textRef }) => (
                    <>
                      <ItemCard.Information
                        content={book.description}
                        color="secondary"
                        className={className}
                        ref={textRef}
                      />
                      {isTruncated && (
                        <Button
                          variant="custom"
                          onClick={toggle}
                          className="hover:text-primary-hover text-primary text-[clamp(10px,0.5rem+1vw,16px)]"
                        >
                          {isShownFull ? "Collapse" : "Read more"}
                        </Button>
                      )}
                    </>
                  )}
                </Collapse>
              </div>
            </div>
          </div>
        </ItemCard>
        <div className="flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <p className="text-2xl">Reader Reviews</p>
              <p className="text-secondary">Join the conversation about this book</p>
            </div>
            {isAuthenticated && !hasReviewed ? (
              <Button
                variant="primary"
                size="small"
                onClick={() => openModal("review")}
                className="font-bold"
              >
                Write a Review
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="bg-card-back border border-primary-hover rounded-md w-full sm:w-[40%] flex flex-col min-h-[200px]">
              <div className="relative flex items-center gap-4">
                <div className="relative leading-none">
                  <Image src={Quote} alt="" width={80} height={80} className="block" />
                  <Image
                    src={Sparkle}
                    alt=""
                    className="absolute -bottom-2 -right-2"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-primary text-sm sm:text-lg font-bold">FEATURED QUOTE</p>
              </div>
              <div className="w-full flex text-center justify-center p-10">
                <p className="text-[clamp(1.25rem,4vw,2.25rem)] font-lobster leading-normal">{`"${book.quote || "A quote incoming..."}"`}</p>
              </div>
            </div>
            <div className="w-full sm:w-[60%] flex flex-col gap-4">
              {reviews && reviews.length > 0 ? (
                <VirtualizerList items={reviews}>
                  {(review) => (
                    <ErrorBoundary title={review.bookTitle} message="The card went wild">
                      <ReviewDisplay
                        review={review}
                        rating={review.rating}
                        date={formatDate(review.createdAt)}
                        comment={review.comment}
                        userName={review.userName}
                        userId={userId}
                        handleOpen={(review) => handleOpen(review, "edit")}
                      />
                    </ErrorBoundary>
                  )}
                </VirtualizerList>
              ) : (
                <div className="flex items-center justify-center p-4 bg-background border border-secondary rounded-md">
                  <p className="text-secondary">There are no reviews yet. Be first to leave one</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modal === "review" && !selectedReview && book && (
        <ModalWindow header={`Reviewing: ${book.title}`} handleCancel={handleCloseModal}>
          <ReviewForm
            handleCancel={handleCloseModal}
            cancelButton="Cancel"
            acceptButton="Add review"
            bookId={book._id}
          />
        </ModalWindow>
      )}
      {modal === "edit" && selectedReview && book && (
        <ModalWindow header={`Editing review for: ${book.title}`} handleCancel={handleCloseModal}>
          <ReviewForm
            handleCancel={handleCloseModal}
            cancelButton="Cancel"
            acceptButton="Save changes"
            bookId={book._id}
            editionData={selectedReview}
          />
        </ModalWindow>
      )}
    </div>
  );
}
